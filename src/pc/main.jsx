import React from "react";
import ReactDOM from "react-dom";
import './css/global.scss';
import style from './css/navbar.scss';
import {
	BrowserRouter as Router,
	Route,
	Link,
	Switch
} from 'react-router-dom';
import Sidebar from "./sidebar.js";
import TOCbar from "./TOCbar.js";
import styleB from "./css/container.scss";
import Articlelist from "./articlelist.js";
import Article from "./Article"
import Musicplayer from "./Musicplayer"
import MarkdownEditor from "./MarkdownEditor"
import Aboutme from "./Aboutme";
import {
    AppState
} from './AppState.js';
import {
    observer
} from 'mobx-react';

/*
function asyncComponent(getComponent) {
  return class AsyncComponent extends React.Component {
    static Component = null;
    state = { Component: AsyncComponent.Component };

    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then(Component => {
          AsyncComponent.Component = Component
          this.setState({ Component })
        })
      }
    }
    render() {
      const { Component } = this.state
      if (Component) {
        return <Component {...this.props} />
      }
      return null
    }
  }
}

const Musicplayer = asyncComponent(() =>
  System.import('./Musicplayer').then(module => module.default)
)
const MarkdownEditor = asyncComponent(() =>
  System.import('./MarkdownEditor').then(module => module.default)
)
const Aboutme = asyncComponent(() =>
  System.import('./Aboutme').then(module => module.default)
)
const Article = asyncComponent(() =>
  System.import('./Article').then(module => module.default)
)*/

@observer class Frontpage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			display: 'none'
		}
	}
	componentDidMount() {
		// loadMusicplayer(() => {})
		window.onscroll = () => {
			if (window.scrollY > document.body.clientHeight) {
				this.setState({
					display: 'block'
				})
			} else {
				this.setState({
					display: 'none'
				})
			}
		}
	}
	backToTopQuick() {
		document.body.scrollTop = 0;
	}
	backtotop() {
		var timer = null;
		cancelAnimationFrame(timer);
		timer = requestAnimationFrame(function fn() {
			var oTop = document.body.scrollTop || document.documentElement.scrollTop;
			if (oTop > 0) {
				document.body.scrollTop = document.documentElement.scrollTop = oTop - 200;
				timer = requestAnimationFrame(fn);
			} else {
				cancelAnimationFrame(timer);
			}
		})
	}


	render() {
		return (<Router>
			<div>
			<div className={style.title}>
		<ul className={style.ul}>
		<li className={style.logo}><Link to='/' onClick={this.backToTopQuick.bind(this)}>Sangle</Link></li>
		<Link to='/articles/编程' onClick={this.backToTopQuick.bind(this)}><li>编程</li></Link>
		<Link to='/articles/生活' onClick={this.backToTopQuick.bind(this)}><li>生活</li></Link>
		<Link to='/music' onClick={this.backToTopQuick.bind(this)}><li>音乐</li></Link>
		<Link to='/tools' onClick={this.backToTopQuick.bind(this)}><li>工具</li></Link>
		<Link to='/aboutme' onClick={this.backToTopQuick.bind(this)}><li>关于我</li></Link>
			</ul>
		<Route path="/articles/编程/:id" component={TOCbar}/>
		<Route path="/articles/生活/:id" component={TOCbar}/>
		</div><div id="mainbody" style={{'transform':AppState.mainbodyTransform}} className={style.mainbody}>
		<Sidebar />
		<div className={styleB.container}>
		<Switch>
		<Route exact path='/' component={Articlelist}/>
		<Route exact path="/articles/编程" component={Articlelist}/>
		<Route exact path="/articles/生活" component={Articlelist}/>
		<Route path="/articles/编程/:id" component={Article}/>
		<Route path="/articles/生活/:id" component={Article}/>
		<Route path="/music" component={Musicplayer}/>
		<Route path="/tools" component={MarkdownEditor}/>
		<Route path="/aboutme" component={Aboutme}/>
		</Switch>
		</div>
		</div>
		<div onClick={this.backtotop.bind(this)} style={{'display':this.state.display}}className={styleB.FloatingButton}><i className="fa fa-angle-double-up" aria-hidden="true"></i></div>
		</div>
		</Router>)
	}
}

ReactDOM.render(<Frontpage />, document.getElementById('root'))
