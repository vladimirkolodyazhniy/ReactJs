import { expect } from 'chai';
import { fromJS, List, Map } from 'Immutable';

import {
    formatDate, sumListBy, getWeekDay, isDateInRange,
    getUserWithMaxOrdersAmount, getTotalOrdersCount ,
    getSortedOrdersListWithUserName, getInterestCounts,
    getUserIdWithMaxOrdersTotalAmount, getOrderListByStatus,
    getUsersListByDateInLastOrder, getAverageOrderAmountInPeriod,
    getDayOfBiggestOrderAmount, updateUserInfo
} from './tasks';

describe('formatDate', () => {
    it('should return formated Date', () => {
        const testData = '21-01-2015';

        const result = formatDate(testData);

        expect(result).to.equalDate(new Date('2015-01-21'));
  	});
});

describe('sumListBy', () => {
    it('should return sum of list props', () => {
        const testData = fromJS({
            orders: [{
                id: 5,
                sum: 235
            }, {
                id: 53,
                sum: 125
            }]

        });

        const result = sumListBy('sum')(testData.get('orders'));

        expect(result).to.be.a.number;
        expect(result).to.not.equal(0);
        expect(result).to.equal(360);
  	});

    it('should return 0 if summed list is empty', () => {
        const testData = fromJS({
            orders: []
        });

        const result = sumListBy('sum')(testData.get('orders'));

        expect(result).to.be.a.number;
        expect(result).to.equal(0);
  	});
});

describe('getWeekDay', () => {
    it('should return weekDays', () => {
        const result = getWeekDay(1);

        expect(result).to.be.a('string')
            .that.equals('Monday');
  	});

    it('should return null if user enter incorect day number', () => {
        const result = getWeekDay(9);

        expect(result).to.be.null;
  	});
});

describe('isDateInRange', () => {
    it('should return list of dates which accept range', () => {
        const testData = fromJS({
            orders: [{
                id: 65,
                sum: 567,
                date: '21-03-2015'
            }, {
                id: 54,
                sum: 1235,
                date: '01-02-2015'
            }, {
                id: 54,
                sum: 218,
                date: '26-02-2015'
            }]
        });

        const from = '11-01-2015';
        const to = '02-02-2015';

        const result = isDateInRange(testData.get('orders'), from, to);

        expect(result).to.be.an.instanceof(List)
            .that.have.property(0)
            .that.is.an.instanceof(Map)
            .that.equals(new Map({
                id: 54,
                sum: 1235,
                date: '01-02-2015'
            }));
    });

    it('should return empty list id date in not in range', () => {
        const testData = fromJS({
            orders: [{
                id: 65,
                sum: 567,
                date: '21-03-2015'
            }, {
                id: 54,
                sum: 1235,
                date: '12-02-2015'
            }, {
                id: 54,
                sum: 218,
                date: '26-02-2015'
            }]
        });

        const from = '11-01-2015';
        const to = '02-02-2015';

        const result = isDateInRange(testData.get('orders'), from, to);

        expect(result).to.be.an.instanceof(List);
        expect(result).to.be.empty;
    });
});

describe('getUserWithMaxOrdersAmount', () => {
    it('should return user with 3 orders', () => {
        const testData = fromJS([{
            id: 1,
            name: 'Vasya',
            orders: [{
                id: 5
            }, {
                id: 53
            }]
        }, {
            id: 2,
            name: 'Ivan',
            orders: [{
                id: 65
            }, {
                id: 54
            }, {
                id: 54
            }]
        }]);

        const result = getUserWithMaxOrdersAmount(testData);

        expect(result).to.be.an.instanceof(Map)
            .that.eql(fromJS({
                id: 2,
                name: 'Ivan',
                orders: [{
                    id: 65
                }, {
                    id: 54
                }, {
                    id: 54
                }]
            }));
  	});

	it('returns first array item if orders array is empty', () => {
        const testData = fromJS([{
            id: 1,
            name: 'Vasya',
            orders: []
        }, {
            id: 2,
            name: 'Ivan',
            orders: []
        }]);

        const result = getUserWithMaxOrdersAmount(testData);

        expect(result).to.be.an.instanceof(Map)
            .that.eql(fromJS({
                id: 1,
                name: 'Vasya',
                orders: []
            }));
    });
});

describe('getTotalOrdersCount', () => {
    it('should return 5 orders', () => {
        const testData = fromJS([{
            id: 1,
            name: 'Vasya',
            orders: [{
                id: 5
            }, {
                id: 53
            }]
        }, {
            id: 2,
            name: 'Ivan',
            orders: [{
                id: 65
            }, {
                id: 54
            }, {
                id: 54
            }]
        }]);

        const result = getTotalOrdersCount(testData);

        expect(result).to.be.a.number;
        expect(result).to.not.equal(0);
        expect(result).to.equal(5);
  	});

    it('returns 0 if orders array is empty', () => {
        const testData = fromJS([{
            id: 1,
            name: 'Vasya',
            orders: []
        }, {
            id: 2,
            name: 'Ivan',
            orders: []
        }]);

        const result = getTotalOrdersCount(testData);

        expect(result).to.be.a.number;
        expect(result).to.equal(0);
  	});
});

describe('getSortedOrdersListWithUserName', () => {
    it('should return sorted list with users full name', () => {
        const testData = fromJS([{
            id: 1,
            name: 'Vasya',
            surname: 'Ivanov',
            orders: [{
                id: 5,
                date: '21-01-2015'
            }, {
                id: 53,
                date: '25-01-2015'
            }]
        }, {
            id: 2,
            name: 'Ivan',
            surname: 'Tretyakov',
            orders: [{
                id: 65,
                date: '21-01-2015'
            }, {
                id: 54,
                date: '01-02-2015'
            }, {
                id: 54,
                date: '26-02-2015'
            }]
        }]);

        const result = getSortedOrdersListWithUserName(testData);

        expect(result).to.be.an.instanceof(List)
            .to.have.size(5)
            .to.be.sortedBy('date' , true)
                .that.have.property(0)
                .that.is.an.instanceof(Map)
                .that.equals(new Map({
                    id: 54,
                    date: '26-02-2015',
                    user: 'Ivan Tretyakov'
                }));
  	});

    it('should return empty array if user do not have orders', () => {
        const testData = fromJS([{
            id: 1,
            name: 'Vasya',
            surname: 'Ivanov',
            orders: []
        }, {
            id: 2,
            name: 'Ivan',
            surname: 'Tretyakov',
            orders: []
        }]);

        const result = getSortedOrdersListWithUserName(testData);

        expect(result).to.be.an.instanceof(List);
        expect(result).to.be.empty;
  	});

    it('should return sorted list with full name of first user if other does not have orders', () => {
        const testData = fromJS([{
            id: 1,
            name: 'Vasya',
            surname: 'Ivanov',
            orders: [{
                id: 5,
                date: '21-01-2015'
            }, {
                id: 53,
                date: '25-01-2015'
            }]
        }, {
            id: 2,
            name: 'Ivan',
            surname: 'Tretyakov',
            orders: []
        }]);

        const result = getSortedOrdersListWithUserName(testData);

        expect(result).to.be.an.instanceof(List)
            .to.have.size(2)
            .to.be.sortedBy('date' , true)
                .that.have.property(0)
                .that.is.an.instanceof(Map)
                .that.equals(new Map({
                    id: 53,
                    date: '25-01-2015',
                    user: 'Vasya Ivanov'
                }));
  	});
});

describe('getInterestCounts', () => {
    it('counting of interests', () => {
        const testData = fromJS([{
            id: 1,
            name: 'Vasya',
            interests: ['computers', 'food']
        }, {
            id: 2,
            name: 'Ivan',
            interests: ['computers', 'food', 'cars']
        }]);

        const result = getInterestCounts(testData);

        expect(result).to.have.keys('computers', 'food', 'cars');
        expect(result).to.be.an.instanceof(Map)
            .that.equals(new Map({
                cars: 1,
                computers: 2,
                food: 2
            }));
  	});

    it('returns empty object if interests array is empty', () => {
        const testData = fromJS([{
            id: 1,
            name: 'Vasya',
            interests: []
        }, {
            id: 2,
            name: 'Ivan',
            interests: []
        }]);

        const result = getInterestCounts(testData);

        expect(result).to.be.an.instanceof(Map).to.be.empty;
  	});

    it('should return first user interests count if other does not have it', () => {
        const testData = fromJS([{
            id: 1,
            name: 'Vasya',
            interests: ['computers', 'food']
        }, {
            id: 2,
            name: 'Ivan',
            interests: []
        }]);

        const result = getInterestCounts(testData);

        expect(result).to.have.keys('computers', 'food');
        expect(result).to.be.an.instanceof(Map)
            .that.equals(new Map({
                computers: 1,
                food: 1
            }));
  	});
});

describe('getUserIdWithMaxOrdersTotalAmount', () => {
    it('should return user Id 2', () => {
        const testData = fromJS([{
            id: 1,
            name: 'Vasya',
            orders: [{
                id: 5,
                sum: 235
            }, {
                id: 53,
                sum: 125
            }]
        }, {
            id: 2,
            name: 'Ivan',
            orders: [{
                id: 65,
                sum: 2235
            }, {
                id: 54,
                sum: 567
            }, {
                id: 54,
                sum: 1235
            }]
        }]);

        const result = getUserIdWithMaxOrdersTotalAmount(testData);

        expect(result).to.be.a.number;
        expect(result).to.be.equal(2);
  	});

    it('should return first user Id if orders sum equals 0', () => {
        const testData = fromJS([{
            id: 1,
            name: 'Vasya',
            orders: [{
                id: 5,
                sum: 0
            }]
        }, {
            id: 2,
            name: 'Ivan',
            orders: [{
                id: 65,
                sum: 0
            }]
        }]);

        const result = getUserIdWithMaxOrdersTotalAmount(testData);

        expect(result).to.be.a.number;
        expect(result).to.be.equal(1);
  	});

    it('should return user id 1 if other does not have orders', () => {
        const testData = fromJS([{
            id: 1,
            name: 'Vasya',
            orders: [{
                id: 65,
                sum: 150
            }]
        }, {
            id: 2,
            name: 'Ivan',
            orders: []
        }]);

        const result = getUserIdWithMaxOrdersTotalAmount(testData);

        expect(result).to.be.a.number;
        expect(result).to.be.equal(1);
    });
});

describe('getOrderListByStatus', () => {
    it('should return list with selected status', () => {
        const status = 'DELIVERED';

        const testData = fromJS([{
            id: 1,
            name: 'Vasya',
            orders: [{
                id: 5,
                status: 'DELIVERED'
            }, {
                id: 53,
                status: 'CANCELED'
            }]
        }, {
            id: 2,
            name: 'Ivan',
            orders: [{
                id: 65,
                status: 'DELIVERED'
            }, {
                id: 54,
                status: 'REFUND'
            }, {
                id: 54,
                status: 'PLACED'
            }]
        }, {
            id: 3,
            name: 'Daryna',
            orders: [{
                id: 65,
                status: 'PLACED'
            }]
        }]);

        const result = getOrderListByStatus(testData, status);

        expect(result).to.be.an.instanceof(List)
            .to.have.size(2)
                .that.have.property(0)
                .that.is.an.instanceof(Map);

        result.toJS().should.all.have.property('status', 'DELIVERED');
  	});

    it('should return empty array if no match selected status', () => {
        const status = 'UPDATED';

        const testData = fromJS([{
            id: 1,
            name: 'Vasya',
            orders: [{
                id: 5,
                status: 'REFUND'
            }, {
                id: 53,
                status: 'CANCELED'
            }]
        }, {
            id: 2,
            name: 'Ivan',
            orders: [{
                id: 65,
                status: 'DELIVERED'
            }, {
                id: 54,
                status: 'REFUND'
            }, {
                id: 54,
                status: 'PLACED'
            }]
        }]);

        const result = getOrderListByStatus(testData, status);

        expect(result).to.be.an.instanceof(List).to.be.empty;
  	});

    it('should return list with selected status if status is entered in lowercase', () => {
        const status = 'canceled';

        const testData = fromJS([{
            id: 1,
            name: 'Vasya',
            orders: [{
                id: 53,
                status: 'CANCELED'
            }]
        }, {
            id: 2,
            name: 'Ivan',
            orders: [{
                id: 65,
                status: 'DELIVERED'
            }, {
                id: 54,
                status: 'REFUND'
            }, {
                id: 54,
                status: 'PLACED'
            }]
        }]);

        const result = getOrderListByStatus(testData, status);

        expect(result).to.be.an.instanceof(List).to.have.size(1);
  	});
});

describe('getUsersListByDateInLastOrder', () => {
    it('should return user list that have last order date January 2015', () => {
        const date = new Date('2015-01');

        const testData = fromJS([{
            id: 1,
            name: 'Vasya',
            orders: [{
                id: 5,
                date: '21-01-2015'
            }, {
                id: 53,
                date: '25-01-2015'
            }]
        }, {
            id: 2,
            name: 'Ivan',
            orders: [{
                id: 65,
                date: '21-01-2015'
            }, {
                id: 54,
                date: '01-02-2015'
            }, {
                id: 54,
                date: '26-02-2015'
            }]
        }]);

        const result = getUsersListByDateInLastOrder(testData, date);

        result.toJS().should.all.have.property('orders')
            .that.should.all.have.property('date');

        expect(result).to.be.an.instanceof(List)
            .that.have.property(0)
            .that.is.an.instanceof(Map)
                .that.eql(fromJS({
                    id: 1,
                    name: 'Vasya',
                    orders: [{
                        id: 5,
                        date: '21-01-2015'
                    }, {
                        id: 53,
                        date: '25-01-2015'
                    }]
                }));
    });

    it('should return user list that have last order date January 2014', () => {
        const date = new Date('2014-01');

        const testData = fromJS([{
            id: 1,
            name: 'Vasya',
            orders: [{
                id: 5,
                date: '21-01-2015'
            }, {
                id: 53,
                date: '25-01-2015'
            }]
        }, {
            id: 2,
            name: 'Ivan',
            orders: [{
                id: 54,
                date: '26-01-2014'
            }]
        }]);

        const result = getUsersListByDateInLastOrder(testData, date);

        result.toJS().should.all.have.property('orders')
            .that.should.all.have.property('date');

        expect(result).to.be.an.instanceof(List)
            .that.have.property(0)
            .that.is.an.instanceof(Map)
                .that.eql(fromJS({
                    id: 2,
                    name: 'Ivan',
                    orders: [{
                        id: 54,
                        date: '26-01-2014'
                    }]
                }));
    });


    it('should return empty array if there is no January 2015 date in orders or date is not last', () => {
        const date = new Date('2015-01');

        const testData = fromJS([{
            id: 1,
            name: 'Vasya',
            orders: [{
                id: 5,
                date: '21-01-2015'
            }, {
                id: 53,
                date: '25-02-2015'
            }]
        }, {
            id: 2,
            name: 'Ivan',
            orders: [{
                id: 65,
                date: '21-03-2015'
            }, {
                id: 54,
                date: '01-02-2015'
            }, {
                id: 54,
                date: '26-02-2015'
            }]
        }]);

        const result = getUsersListByDateInLastOrder(testData, date);

        expect(result).to.be.an.instanceof(List)
        expect(result).to.be.empty;
    });
});

describe('getAverageOrderAmountInPeriod', () => {
    it('should return average amount', () => {
        const testData = fromJS([{
            id: 1,
            name: 'Vasya',
            orders: [{
                id: 5,
                sum: 125,
                date: '21-01-2015'
            }, {
                id: 53,
                sum: 235,
                date: '25-02-2015'
            }]
        }, {
            id: 2,
            name: 'Ivan',
            orders: [{
                id: 65,
                sum: 567,
                date: '21-03-2015'
            }, {
                id: 54,
                sum: 1235,
                date: '01-02-2015'
            }, {
                id: 54,
                sum: 218,
                date: '26-02-2015'
            }]
        }]);

        const from = '11-01-2015';
        const to = '02-02-2015';

        const result = getAverageOrderAmountInPeriod(testData, from, to);

        expect(result).to.be.a.number;
        expect(result).to.not.equal(0);
        expect(result).to.equal(680);
  	});

    it('should return 0 if orders array is empty', () => {
        const from = '11-01-2015';
        const to = '02-02-2015';

        const testData = fromJS([{
            id: 1,
            name: 'Vasya',
            orders: []
        }, {
            id: 2,
            name: 'Ivan',
            orders: []
        }]);

        const result = getAverageOrderAmountInPeriod(testData, from, to);

        expect(result).to.be.a.number;
        expect(result).to.equal(0);
  	});

    it('should return 0 if no orders match selected period', () => {
        const from = '11-04-2015';
        const to = '02-05-2015';

        const testData = fromJS([{
            id: 1,
            name: 'Vasya',
            orders: [{
                id: 5,
                sum: 125,
                date: '21-01-2015'
            }, {
                id: 53,
                sum: 235,
                date: '25-02-2015'
            }]
        }, {
            id: 2,
            name: 'Ivan',
            orders: [{
                id: 65,
                sum: 567,
                date: '21-03-2015'
            }, {
                id: 54,
                sum: 1235,
                date: '01-02-2015'
            }, {
                id: 54,
                sum: 218,
                date: '26-02-2015'
            }]
        }]);

        const result = getAverageOrderAmountInPeriod(testData, from, to);

        expect(result).to.be.a.number;
        expect(result).to.equal(0);
  	});
});

describe('getDayOfBiggestOrderAmount', () => {
    it('should return weekday with max orders count', () => {
        const testData = fromJS([{
            id: 1,
            name: 'Vasya',
            orders: [{
                id: 5,
                sum: 125,
                date: '21-01-2015'
            }, {
                id: 53,
                sum: 235,
                date: '25-02-2015'
            }]
        }, {
            id: 2,
            name: 'Ivan',
            orders: [{
                id: 65,
                sum: 567,
                date: '21-01-2015'
            }, {
                id: 54,
                sum: 1235,
                date: '25-02-2015'
            }, {
                id: 54,
                sum: 218,
                date: '25-02-2015'
            }]
        }]);

        const result = getDayOfBiggestOrderAmount(testData);

        expect(result).to.be.a('string');
        expect(result).to.equal('Wednesday');
  	});

    it('should return null if orders is empty', () => {
        const testData = fromJS([{
            id: 1,
            name: 'Vasya',
            orders: []
        }, {
            id: 2,
            name: 'Ivan',
            orders: []
        }]);

        const result = getDayOfBiggestOrderAmount(testData);

        expect(result).to.be.null;
  	});
});

describe('updateUserInfo', () => {
    it('should return List with changed current property in object that matches selected Id ', () => {
        const testData = fromJS([{
            id: 1,
            name: 'Vasya',
            surname: 'Ivanov',
            age: 22,
            orders: [{
                id: 5,
                date: '21-01-2015',
                sum: 235,
                status: 'DELIVERED'
            }]
        }]);

        const result = updateUserInfo(testData, 1, { age: 11 });

        expect(result).to.be.an.instanceof(List)
            .that.have.property(0)
                .with.property('id')
                .that.equals(1);

        expect(result).to.be.an.instanceof(List)
            .that.have.property(0)
                .with.property('age')
                .that.equals(11);
  	});

    it('should return List with new added property in object that matches selected Id', () => {
        const testData = fromJS([{
            id: 1,
            name: 'Vasya',
            surname: 'Ivanov',
            age: 22,
            interests: ['computers', 'food', 'cars']
        }]);

        const result = updateUserInfo(testData, 1, { interests: 'book' });

        expect(result).to.be.an.instanceof(List)
            .that.have.property(0)
                .with.property('interests')
                .that.is.an.instanceof(List)
                .that.contain('book');
  	});

    it('should return warning message if selected Id does not match object Id', () => {
        const testData = fromJS([{
            id: 1,
            name: 'Vasya',
            surname: 'Ivanov',
            age: 22,
            interests: ['computers', 'food', 'cars']
        }]);

        const result = updateUserInfo(testData, 2, { interests: 'book' });

        expect(result).to.be.an.instanceof(List)
            .that.eql(fromJS([{
                id: 1,
                name: 'Vasya',
                surname: 'Ivanov',
                age: 22,
                interests: ['computers', 'food', 'cars']
            }]));
  	});
});
