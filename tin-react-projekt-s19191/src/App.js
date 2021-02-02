import React from 'react';
import Header from './components/fragments/Header';
import Navigation from './components/fragments/Navigation';
import MainContent from './components/other/MainContent';
import Footer from './components/fragments/Footer';
import BookList from './components/book/BookList';
import BookDetails from './components/book/BookDetails';
import BookForm from './components/book/BookForm';
import WarehouseList from './components/warehouse/WarehouseList';
import WarehouseDetails from './components/warehouse/WarehouseDetails';
import WarehouseForm from './components/warehouse/WarehouseForm';
import ConditionInWarehouseList from './components/conditionInWarehouse/ConditionInWarehouseList';
import ConditionInWarehouseDetails from './components/conditionInWarehouse/ConditionInWarehouseDetails';
import ConditionInWarehouseForm from './components/conditionInWarehouse/ConditionInWarehouseForm';
import LoginForm from "./components/other/LoginForm";
import { getCurrentUser } from "./helpers/authHelper";
import RegisterForm from "./components/other/RegisterForm";
import ProtectedRoute from "./components/other/ProtectedRoute";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: undefined,
            prevPath: ''
        };
    };

    handleLogin = (user) => {
        localStorage.setItem("user", user);
        this.setState({ user: user })
    };

    handleLogout = () => {
        localStorage.removeItem("user");
        this.setState({ user: undefined })
    };

    componentDidMount() {
        const currentUser = getCurrentUser();
        this.setState({ user: currentUser })
    };


    render() {
        return (
            <Router>
                <div>
                    <Header/>
                    <Navigation handleLogout={this.handleLogout}/>
                    <Switch>
                        <Route exact
                               path="/login"
                               render={(props) => (
                                   <LoginForm handleLogin={this.handleLogin} />
                               )}
                        />
                        <Route exact path="/register" component={RegisterForm}/>
                        <Route exact path="/" component={MainContent}/>

                        <Route exact path="/book" component={BookList}/>
                        <Route exact path="/book/details/:ksId" component={BookDetails}/>
                        <ProtectedRoute  exact path="/book/add" component={BookForm}/>
                        <ProtectedRoute  exact path="/book/edit/:ksId" component={BookForm}/>

                        <Route exact path="/warehouse" component={WarehouseList}/>
                        <Route exact path="/warehouse/details/:magId" component={WarehouseDetails}/>
                        <ProtectedRoute exact path="/warehouse/add" component={WarehouseForm}/>
                        <ProtectedRoute exact path="/warehouse/edit/:magId" component={WarehouseForm}/>

                        <Route exact path="/conditionInWarehouse" component={ConditionInWarehouseList}/>
                        <Route exact path="/conditionInWarehouse/details/:swmId" component={ConditionInWarehouseDetails}/>
                        <ProtectedRoute exact path="/conditionInWarehouse/add" component={ConditionInWarehouseForm}/>
                        <ProtectedRoute exact path="/conditionInWarehouse/edit/:swmId" component={ConditionInWarehouseForm}/>
                    </Switch>
                    <Footer/>
                </div>
            </Router>
        );
    };
};

export default App;