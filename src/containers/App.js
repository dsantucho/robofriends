import React, { Component } from "react";
import CardList from "../components/CardList";
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundry from "../components/ErrorBoundry";


class App extends Component {
    constructor() {
        super();
        this.state = {
            robots: [],
            searchfield: ''
        }
        console.log('constructor');
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json()).then(users => {
            this.setState({ robots: users })
        })
        console.log('componentDidMount');
    }

    render() {
        console.log('render');
        const { searchfield, robots } = this.state;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        })
        /*if (robots.length === 0) {
            return <h1>Loading...</h1>
        } else {
            return (
                <div className='tc'>
                    <h1 className='f1'>RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange} />
                    <Scroll>
                        < CardList robots={filteredRobots} />
                    </Scroll>
                </div>
            );
        }*/

        return (!robots.length) ? <h1>Loading...</h1> :
            <div className='tc'>
                <h1 className='f1'>RoboFriends</h1>
                <SearchBox searchChange={this.onSearchChange} />
                <Scroll>
                    <ErrorBoundry>
                        < CardList robots={filteredRobots} />
                    </ErrorBoundry>
                </Scroll>
            </div>
    }
}

export default App;
// example: https://github.com/aneagoie/robofriends