import React from 'react';
import Weather from './Weather';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotate } from '@fortawesome/free-solid-svg-icons';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 5,
            timeToRefresh: false
        };
        this.count = this.count.bind(this);
        this.interval = 0;
    }

    count() {
        if (this.state.time == 1) {
            this.setState({ time: 5, timeToRefresh: true });
        }
        else if (this.state.time == 5) {
            this.setState({ time: this.state.time - 1, timeToRefresh: false });
        }
        else {
            this.setState({ time: this.state.time - 1 });
        }

    }

    componentDidMount() {
        this.interval = window.setInterval(this.count, 60000)
    }

    componentWillUnmount() {
        window.clearInterval(this.interval)
    }


    render() {
        const { time, timeToRefresh } = this.state;
        return (
            <div className="general-frame">
                <Weather timeToRefresh={timeToRefresh} />
                <div className="refreshing">
                    <div className="sign"><FontAwesomeIcon icon={faRotate} /></div>
                    <div> in {time} minute(s)</div>
                </div>
            </div>
        )
    }
}
    

export default App

