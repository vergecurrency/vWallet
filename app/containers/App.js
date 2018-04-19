// @flow
import * as React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../resources/css/menu_wave.css';

type Props = {
  children: React.Node
};

export default class App extends React.Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}
