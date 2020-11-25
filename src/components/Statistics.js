import React, { useState, useEffect } from "react";
import _ from "lodash";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
    } from 'recharts';

function Statistics() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(data => formatData(data.content))
        .then(stat => setData(stat))
        .catch(err => console.error(err))
    }, []);

    const formatData = (data) => {
        let statistics = _(data).groupBy('activity')
                                .map((objs, key) => ({
                                'activity': key,
                                'duration': _.sumBy(objs, 'duration') }))
                                .value();
        return statistics;
    };

    return (
        <div>
            <div style={{width: "99%", height: 600}}>
                <ResponsiveContainer width="80%" height={550}>
                    <BarChart data={data} margin={{ top: 40, right: 30, left: 20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="activity"/>
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar name="Duration (min)" dataKey="duration" fill="#3f51b5" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default Statistics;