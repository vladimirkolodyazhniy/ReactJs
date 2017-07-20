import ReactGA from 'react-ga';

const eventsHash = {
    ADD_TODO: ({ action, sendEvent }) => (
        sendEvent(`Add new Todo with id ${action.id} and text ${action.text}`)
    ),
    DELETE_TODO: ({ action, sendEvent }) => (
        sendEvent(`Delete Todo with id ${action.id}`)
    ),
    TOGGLE_TODO: ({ action, sendEvent }) => (
        sendEvent(`Todo with id ${action.id} is completed`)
    ),
};

class Analytic {
    constructor() {
        ReactGA.initialize('UA-85662437-1');

        ReactGA.event({
            category: 'TODOLIST',
            action: 'User opened website',
        });
    }

    sendEvent(action) {
        ReactGA.event({
            action,
            category: 'TODO'
        });
    }

    handleEvent(action) {
        if (eventsHash[action.type]) {
            eventsHash[action.type]({
                action,
                sendEvent: this.sendEvent
            });
        }
    }
}

export default (new Analytic());
