import React, { Component } from 'react'
import 'antd/dist/antd.css'
import Head from '@symph/joy/head'
import { LocaleProvider } from 'antd'
import dynamic from '@symph/joy/dynamic'
import { Switch, Route, Redirect } from '@symph/joy/router'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import AppController from './controllers/AppController'
import ArticleComponents from './components/Article'

// 加载业务组件 
import loading from './components/Loading'

const DashboardController = dynamic({loader: () => import('./controllers/DashboardController/dashboardController'), loading});
const IndexController = dynamic({loader: () => import('./controllers/IndexController'), loading});

export default class Main extends Component {
  render () {
    return (
      <div>
        <Head>
          <title>Nekohand Blog Content Management Service</title>
        </Head>
        <LocaleProvider locale={zhCN}>
          <AppController>
            <Switch>
              <DashboardController path="/dashboard">
                <Switch>
                  <Route path="/dashboard/article-list" component={ArticleComponents.ArticleList} />
                  <Route path="/dashboard/article-category" component={ArticleComponents.ArticleCategory} />
                  <Route component={() => (<div>Waiting for the development..</div>)}/>
                </Switch>
              </DashboardController>
              <Route path="/" component={IndexController}/>
            </Switch>
          </AppController>
        </LocaleProvider>
      </div>
    )
  }
};

