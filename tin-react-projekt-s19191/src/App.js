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
import ConditionInwarehouseList from './components/conditionInwarehouse/ConditionInwarehouseList';
import ConditionInwarehouseDetails from './components/conditionInwarehouse/ConditionInwarehouseDetails';
import ConditionInwarehouseForm from './components/conditionInwarehouse/ConditionInwarehouseForm';
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

                  <Route exact path="/books" component={BookList} />
                  <Route exact path="/books/details/:ksId" component={BookDetails} />
                  <Route exact path="/books/add" component={BookForm} />
                  <Route exact path="/books/edit/:ksId" component={BookForm} />

                  <Route exact path="/warehouse" component={WarehouseList} />
                  <Route exact path="/warehouse/details/:magId" component={WarehouseDetails} />
                  <Route exact path="/warehouse/add" component={WarehouseForm} />
                  <Route exact path="/warehouse/edit/:magId" component={WarehouseForm} />

                  <Route exact path="/conditionInwarehouse" component={ConditionInwarehouseList} />
                  <Route exact path="/conditionInwarehouse/details/:swmId" component={ConditionInwarehouseDetails} />
                  <Route exact path="/conditionInwarehouse/add" component={ConditionInwarehouseForm} />
                  <Route exact path="/conditionInwarehouse/edit/:swmId" component={ConditionInwarehouseForm} />
              </Switch>
              <Footer />
          </div>
      </Router>
  );
};

export default App;