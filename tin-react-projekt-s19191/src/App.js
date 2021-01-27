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
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';

function App() {
  return (
      <Router>
          <div>
              <Header />
              <Navigation />
              <Switch>
                  <Route exact path="/" component={MainContent} />

                  <Route exact path="/book" component={BookList} />
                  <Route exact path="/book/details/:ksId" component={BookDetails} />
                  <Route exact path="/book/add" component={BookForm} />
                  <Route exact path="/book/edit/:ksId" component={BookForm} />

                  <Route exact path="/warehouse" component={WarehouseList} />
                  <Route exact path="/warehouse/details/:magId" component={WarehouseDetails} />
                  <Route exact path="/warehouse/add" component={WarehouseForm} />
                  <Route exact path="/warehouse/edit/:magId" component={WarehouseForm} />

                  <Route exact path="/conditionInWarehouse" component={ConditionInWarehouseList} />
                  <Route exact path="/conditionInWarehouse/details/:swmId" component={ConditionInWarehouseDetails} />
                  <Route exact path="/conditionInWarehouse/add" component={ConditionInWarehouseForm} />
                  <Route exact path="/conditionInWarehouse/edit/:swmId" component={ConditionInWarehouseForm} />
              </Switch>
              <Footer />
          </div>
      </Router>
  );
};

export default App;