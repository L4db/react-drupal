import React, { Component } from 'react';
import './App.css';
import { buildApi, get} from 'redux-bees';
import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from 'redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {
  reducer as beesReducer,
  middleware as beesMiddleware,
} from 'redux-bees';
import 'bootstrap/dist/css/bootstrap.css';


const reducer = combineReducers({
  bees: beesReducer,
});

const store = createStore(
  reducer,
  compose(
    applyMiddleware(beesMiddleware()),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

const apiEndpoints = {
  getArticles:      { method: get, path: '/node/article' },
  getArticle:       { method: get, path: '/node/article/:id'}
};

const config = {
  baseUrl: 'https://drupal.hardened.be/jsonapi'
};

const api = buildApi(apiEndpoints, config);
store.dispatch(api.getArticles())



class Article extends React.Component{

  render(){

    let title = this.props.attributes.title
    let summary = this.props.attributes.body.summary

    return <div>
              <h3><Button color="link">{title}</Button></h3>
              {summary}
            </div>
  }
}

class ArticleModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {

    let store_state = store.getState()
    let articles = store_state.bees.entities && store_state.bees.entities['node--article']
    console.log(articles)

    return (
      <div>
        <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} size="lg">
          <ModalHeader toggle={this.toggle}>Articles</ModalHeader>
          <ModalBody>
            {articles ? Object.keys(articles).map((article_id) => <Article key={article_id} {...articles[article_id]}/>) : '' }
          </ModalBody>
          <ModalFooter></ModalFooter>
        </Modal>
      </div>
    );
  }
}

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header" color="primary">
              <ArticleModal buttonLabel="Show Articles"/>
        </header>
      </div>
    );
  }
}

export default App;