import React from 'react';
import Header from './components/fragments/Header';
import Navigation from './components/fragments/Navigation';
import MainContent from './components/other/MainContent';
import Footer from './components/fragments/Footer';
import BookList from './components/book/BookList';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';

function App() {
  return (
      <div>
        <Header />
        <Navigation />
          <Router>
          <Switch>
              <Route exact path="/" component={MainContent} />
              <Route exact path="/books" component={BookList} />
          </Switch>
          </Router>
        <Footer />
      </div>
  );
}

export default App;