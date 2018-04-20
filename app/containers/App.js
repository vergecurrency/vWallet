// @ts-check
import * as React from 'react';
import { TitleBar } from 'electron-react-titlebar';
import 'electron-react-titlebar/assets/style.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

// import '../resources/css/menu_wave.css';

type Props = {
  children: React.Node
};

export default class App extends React.Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <TitleBar />
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}
