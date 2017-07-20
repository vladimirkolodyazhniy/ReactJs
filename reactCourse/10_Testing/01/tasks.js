import { fromJS, List, Map, Iterable } from 'Immutable';

export const formatDate = date => new Date(date.split('-').reverse().join('-'));

export const sumListBy = prop => list => list.reduce((sum, current) => sum + current.get(prop), 0);

export const isDateInRange = (keys, from, to) => keys.filter(order => {
    const time = formatDate(order.get('date')).getTime();
    const fromTime = formatDate(from).getTime();
    const toTime = formatDate(to).getTime();

    return (time >= fromTime &&  time <= toTime);
});

export const getWeekDay = dayNumber => {
    const weekDays = List(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);

    if (dayNumber <= 6) {
        return weekDays.get(dayNumber);
    }

    return null;
}

export const getUserWithMaxOrdersAmount = users => users.maxBy(user => user.get('orders').size);

export const getTotalOrdersCount = list => list.reduce((sum, current) => sum + current.get('orders').size, 0);

export const getSortedOrdersListWithUserName = users => {
    return users
        .reduce(
            (orders, user) => (
                orders.concat(
                    user.get('orders').map(
                        order => order.set('user', `${user.get('name')} ${user.get('surname')}`)
                    )
                )
            ),
            new List()
        )
        .sortBy(order => formatDate(order.get('date')))
        .reverse();
};

export const getInterestCounts = users => {
    return users
        .reduce(
            (interestMap, user) => {
                user.get('interests').forEach(
                    interest => (
                        interestMap = interestMap.set(interest, (interestMap.get(interest) || 0) + 1)
                    )
                )
                return interestMap;
            },
            new Map()
        );
};

export const getUserIdWithMaxOrdersTotalAmount = users => {
    const ordersSumList = users.map(user => sumListBy('sum')(user.get('orders')));

    const maxSumListIndex = ordersSumList.indexOf(ordersSumList.max());

    return users.getIn([maxSumListIndex, 'id']);
};

export const getOrderListByStatus = (users, status) => {
    return users
        .reduce(
            (orders, user) => (
                orders.concat(
                    user.get('orders').filter(
                        order => order.get('status') === status.toUpperCase()
                    )
                )
            ),
            new List()
        );
};

export const getUsersListByDateInLastOrder = (users, date) => {
    const parseDate = prop => list => list.last().get(prop).split('-');

    return users
        .filter(user => {
            const parsedDate = parseDate('date')(user.get('orders'));

            return (parsedDate[1] == (date.getMonth() + 1) && parsedDate[2] == date.getFullYear());
        });
};

export const getAverageOrderAmountInPeriod = (users, from, to) => {
    const rangedOrders = users.reduce(
        (list, user) => list.concat(isDateInRange(user.get('orders'), from, to))
        , new List()
    );

    const sumAmount =  sumListBy('sum')(rangedOrders);

    return sumAmount === 0 ? 0 : sumAmount / rangedOrders.size;
};

export const getDayOfBiggestOrderAmount = users => {
    const datesList = users
        .reduce(
            (ordersList, user) => ordersList.concat(user.get('orders'))
            , new List()
        );

    if (datesList.size !== 0) {
        const maxDate = datesList
            .groupBy(order => order.get('date'))
            .maxBy(orderGrouped => orderGrouped.size)
            .first()
            .get('date');

        return getWeekDay(formatDate(maxDate).getDay());
    }

    return null;
};

export const updateUserInfo = (users, userId, updateData) => {
    return users.map(user => {
        if (user.get('id') === userId) {
            fromJS(updateData).forEach((value, key) => {
                const currentValue = user.get(key);
                const newValue = currentValue && Iterable.isIterable(currentValue) ? currentValue.concat(value) : value;

                user = user.set(key, newValue);
            });
        }
        return user;
    });
};
