import React, { Component } from 'react';

import Chart from 'react-chartjs';

import styles from './StatisticPanel.css';

export default class StatisticPanel extends Component {
    constructor(props) {
        super(props);

        this.getAmountByType = this.getAmountByType.bind(this);
    }

    getAmountByType(type, key) {
        const typesArr = this.props.notes.filter( (note) => note[key] === type);

        if (typesArr.length > 1) {
            return typesArr.reduce( (a, b) => { return a + b.moneyAmount; }, 0);
        }

        if (typesArr.length === 1) {
            return typesArr[0].moneyAmount;
        }

        return 0;
    }

    render() {
        const incomes = this.getAmountByType('income', 'category');
        const expenses = Math.abs(this.getAmountByType('expense', 'category'));
        const entertainment = Math.abs(this.getAmountByType('entertainment', 'subCategory'));
        const food = Math.abs(this.getAmountByType('food', 'subCategory'));
        const purchase = Math.abs(this.getAmountByType('purchase', 'subCategory'));
        const other = Math.abs(this.getAmountByType('other', 'subCategory'));

        const chartOptions = {
            responsive: true,
            maintainAspectRatio: true
        };

        const categoryData = [
            {
                value: entertainment,
                color:'#fec960',
                highlight: '#fec960',
                label: 'Entertainment'
            },
            {
                value: incomes,
                color: '#64bf2f',
                highlight: '#64bf2f',
                label: 'Incomes'
            },
            {
                value: food,
                color: '#4184f2',
                highlight: '#4184f2',
                label: 'Food'
            },
            {
                value: purchase,
                color: '#ef6a98',
                highlight: '#ef6a98',
                label: 'Purchase'
            },
            {
                value: other,
                color: '#87dbd4',
                highlight: '#87dbd4',
                label: 'Other'
            }
        ];

        const subCategoryData = {
            labels: '',
            datasets: [
                {
                    label: 'Incomes',
                    fillColor: '#64bf2f',
                    strokeColor: '#64bf2f',
                    pointColor: 'rgba(220,220,220,1)',
                    pointStrokeColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(220,220,220,1)',
                    data: [incomes]
                },
                {
                    label: 'Expenses',
                    fillColor: '#c11b1b',
                    strokeColor: '#c11b1b',
                    pointColor: 'rgba(220,220,220,1)',
                    pointStrokeColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(220,220,220,1)',
                    data: [expenses]
                }
            ]
        };

        return (
            <div className={styles.statistic_panel} >
                <div className={styles.statistic_item}>
                    <Chart.Pie data={categoryData} options={chartOptions} />
                </div>

                <div className={styles.statistic_item}>
                    <Chart.Bar data={subCategoryData} options={chartOptions} />
                </div>
            </div>
        );
    }
}
