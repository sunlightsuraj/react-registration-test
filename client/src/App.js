import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Registration from './pages/Registration';
import { Suspense } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
    return (
        <div className="App">
            <Router>
                <Header />
                <div className="container">
                    <Suspense fallback={<div>Loading...</div>}>
                        <Switch>
                            <Route exact path="/login">
                                <Login />
                            </Route>
                            <Route exact path="/signup">
                                <Registration />
                            </Route>
                            <Route exact path="/">
                                <Home />
                            </Route>
                            <Route exact path="/posts">
                                <Home />
                            </Route>
                            <Route exact path="/profile">
                                <Home />
                            </Route>
                            <Route exact path="/settings">
                                <Home />
                            </Route>
                        </Switch>
                    </Suspense>
                </div>
            </Router>
        </div>
    );
}

export default App;
