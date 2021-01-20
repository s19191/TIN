import React from 'react';
import Header from './components/fragments/Header';
import Navigation from './components/fragments/Navigation';
import MainContent from './components/other/MainContent';
import Footer from './components/fragments/Footer';
import BookList from './components/book/BookList';
import BookDetails from './components/book/BookDetails';
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
                  <Route exact path="/books/details/:Id_Ksiazka" component={BookDetails} />
              </Switch>
              <Footer />
          </div>
      </Router>
  );
}

export default App;