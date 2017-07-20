const { fromJS, List, Map, Iterable } = Immutable;

const log = (...args) => console.log(...args.map(arg => JSON.parse(JSON.stringify(arg))));

const users = fromJS([{
    id: 1,
    name: 'Vasya',
    surname: 'Ivanov',
    age: 22,
    orders: [{
        id: 5,
        date: '21-01-2015',
        sum: 235,
        status: 'DELIVERED'
    }, {
        id: 53,
        date: '25-01-2015',
        sum: 125,
        status: 'CANCELED'
    }],
    interests: ['computers', 'food']
}, {
    id: 2,
    name: 'Ivan',
    surname: 'Tretyakov',
    age: 34,
    orders: [{
        id: 65,
        date: '21-01-2015',
        sum: 2235,
        status: 'DELIVERED'
    }, {
        id: 54,
        date: '01-02-2015',
        sum: 567,
        status: 'REFUND'
    }, {
        id: 54,
        date: '26-02-2015',
        sum: 1235,
        status: 'PLACED'
    }],
    interests: ['computers', 'food', 'cars']
}, {
    id: 4,
    name: 'Daryna',
    surname: 'Petrova',
    age: 21,
    orders: [{
        id: 57,
        date: '29-01-2015',
        sum: 218,
        status: 'DELIVERED'
    }],
    interests: ['cars', 'math']
}, {
    id: 5,
    name: 'Petro',
    surname: 'Nalyvaiko',
    age: 45,
    orders: [{
        id: 5,
        date: '21-01-2015',
        sum: 783,
        status: 'DELIVERED'
    }, {
        id: 5,
        date: '24-01-2015',
        sum: 67,
        status: 'DECLINED'
    }, {
        id: 5,
        date: '29-01-2015',
        sum: 1234,
        status: 'DELIVERED'
    }, {
        id: 5,
        date: '04-02-2015',
        sum: 123,
        status: 'DELIVERED'
    }, {
        id: 5,
        date: '15-02-2015',
        sum: 245,
        status: 'DELIVERED'
    }],
    interests: ['computers', 'food', 'math']
}]);

/**
 * TASK 1
 * Получить пользователя с максимальным количеством заказов
*/
{
    const userMaxOrders = users.maxBy(user => user.get('orders').size);

    //log(userMaxOrders);
}

/**
 * TASK 2
 * Получить общее количество заказов
*/
{
    const ordersCount = users.reduce((sum, current) => sum + current.get('orders').size, 0);

    //log(ordersCount);
}

/**
 * TASK 3
 * Получить список всех заказов с указанием имени пользователя, который его совершил
 * Сам объект с заказом должен иметь вид:
 * {
 *    id: 5,
 *    date: '15-02-2015',
 *    sum: 245,
 *    status: 'DELIVERED',
 *    user: 'Petro Nalyvaiko'
 * }
 * Отсортировать в полядке убывания даты
*/
{
    const newOrders = users.reduce(
        (orders, user) =>
        orders.concat(user.get('orders').map(
            order => order.set('name', `${user.get('name')} ${user.get('surname')}`)
        ))
    , new List()
    ).sortBy(order => new Date(order.get('date').split('-').reverse().join('-'))).reverse();

    //log(newOrders);
}

/**
 * TASK 4
 * Получить распределение по интересам в виде оюъекта вида:
 * { books: 5, computers: 2 }
*/
{
    const interests = users.reduce(
        (interestList, user) =>
        interestList.concat(user.get('interests'))
    , new List()
    ).reduce((interestMap, current) =>
        interestMap.set(current, (interestMap.get(current) || 0) + 1)
    , new Map());

    //log(interests);
}

/**
 * TASK 5
 * Получить id пользователя с суммарной макcимальной потраченной суммой
*/
{
    const sumFunc = data => data.reduce((sum, current) => sum + current.get('sum'), 0);

    const sumArr = users.map(user => sumFunc(user.get('orders')));

    const userMaxSum = users.find(user => {
        const value = sumFunc(user.get('orders'));

        return sumArr.max() === value;
    });

    const id = userMaxSum.get('id');

    //log(id);
}

/**
 * TASK 6
 * Получить список заказов в выбранным статусом
*/
{
    const status = 'DELIVERED';

    const ordersList = users.reduce((orders, user) =>
    orders.concat(user.get('orders').filter(order =>
        order.get('status').search(status) !== -1))
    , new List());

    //log(ordersList);

}

/**
 * TASK 7
 * Получить всех пользователей, последний заказ которых был совершен в январе 2015 года
*/
{
    const date = user => user.get('orders').last().get('date').split('-');

	const usersList = users.filter(user => date(user)[1] === '01' && date(user)[2] === '2015');

    //log(usersList);
}

/**
 * TASK 8
 * Получить среднюю сумму заказа за выбранный период
*/
{
    const from = '11-01-2015';
    const to = '02-02-2015';

    const formatDate = date => new Date(date.split('-').reverse().join('-')).getTime();

    const isInRange = key => key.filter(order => formatDate(order.get('date')) >= formatDate(from) &&  formatDate(order.get('date')) <= formatDate(to));

    const rangedOrders = users.reduce((list, user) =>
        list.concat(isInRange(user.get('orders')))
    , new List());

    const average = rangedOrders.reduce((sum, current) => sum + current.get('sum'), 0) / rangedOrders.size;

    //log(average);//683

}

/**
 * TASK 9
 * Определить день, в который было совершено наибольшее количество заказов
*/
{
    const weekdays = List(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);

    const formatDate = date => new Date(date.split('-').reverse().join('-'));

    const dates = users.reduce((list, user) =>
    list.concat(user.get('orders').map(
        date => date.get('date')))
    , new List()
    ).reduce((datesMap, current) =>
        datesMap.set(current, (datesMap.get(current) || 0) + 1)
    , new Map());

    const maxDate = dates.keySeq().reduce((a, b) =>
    dates.get(a) > dates.get(b) ? a : b );

    const day = weekdays.get(formatDate(maxDate).getDay())

    //log(day);
}

/**
 * TASK 10
 * Напишите метод `updateUserInfo(users, userId, info)`
 * в который передается:
 *   1. список всех пользователей
 *   2. id пользователя, который нужно изменить
 *   3. данные об этом пользователе
 * Этот метод должен вернуть новый массив с измененными данными и пользователе
 * Например:
 *   1. `updateUserInfo(users, 1, { age: 23 })`
 *      вернет список, в котором у пользователя с id = 1, возраст изменится на 23
 *   2. `updateUserInfo(users, 1, { interests: 'books' })`
 *      вернет список, в котором у пользователя с id = 1, в массив интересов
 *      добавится строка 'books' (если ее там не было)
*/
{
    const updateUserInfo = (users, userId, info) => {
        const changeData = fromJS(info);

        const key = changeData.keySeq().get(0);

        const userById = users.find(user => user.get('id') === userId);

        const isIterable = Iterable.isIterable(userById.get(key));

        const updateIterable = user => user.updateIn([key], val => val.includes(changeData.get(key)) ? val : val.push(changeData.get(key)));

        const updateSingle = user => user.update(key, () => changeData.get(key));

        return users.map(user => user.get('id') === userId ? isIterable ? updateIterable(user) : updateSingle(user) : user);
    }

    //log(updateUserInfo(users, 1, { age: 11 }))
    //log(updateUserInfo(users, 1, { interests: 'book' }))
}
