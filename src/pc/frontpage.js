import React from "react";
import './css/global.scss';
import style from './css/navbar.scss';
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';
import {
	Switch
} from 'react-router';
import Sidebar from "./sidebar.js";
import styleB from "./css/container.scss";
import Articlelist from "./articlelist.js";
import Article from './article.js'
import Musicplayer from './Musicplayer.js'
import MarkdownEditor from './markdownEditor.js';
import Aboutme from "./aboutme.js"

export default class Frontpage extends React.Component {
	render() {
		return (<Router>
			<div>
			<div className={style.title}>
		<ul className={style.ul}>
		<li className={style.logo}><Link to='/'>Sangle</Link></li>
		<li><Link to='/articles/编程'>编程</Link></li>
		<li><Link to='/articles/生活'>生活</Link></li>
		<li><Link to='/music'>音乐</Link></li>
		<li><Link to='/tools'>工具</Link></li>
		<li><Link to='/aboutme'>关于我</Link></li>
			</ul>
		</div><div className={style.mainbody}><Sidebar />

		<div className={styleB.container}>
		<Switch>
		<Route exact path='/' component={Articlelist}/>
		<Route path='/pc' component={Articlelist}/>
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
		</div>
		</Router>)
	}
}