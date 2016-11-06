import React from 'react';


class NavBar extends React.Component {


render() {

    return(
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">Gamehound</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li className="active"><a href="#">About<span className="sr-only">(current)</span></a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>

            <ul className="nav navbar-nav navbar-right">
              <li form className="navbar-form navbar-right" role="search">
                <div className="form-group">
                    <input type="text" className="form-control" name="username" placeholder="Username"/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" name="password" placeholder="Password"/>
                </div>
                <button type="submit" className="btn btn-default">Sign In</button>
              </li> 
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown"><b>Dont have an account?</b> <span className="caret"></span></a>
                  <ul id="login-dp" className="dropdown-menu">
                    <li>
                     <div className="row">
                        <div className="col-md-12">
                           <form className="form" role="form" method="post" action="signup" accept-charset="UTF-8" id="signup-nav">
                              <div className="form-group">
                                 <label className="sr-only" for="exampleInputEmail2">Email address</label>
                                 <input type="email" className="form-control" id="exampleInputEmail2" placeholder="Email address" required/>
                              </div>
                              <div className="form-group">
                                 <label className="sr-only" for="exampleInputPassword2">Password</label>
                                 <input type="password" className="form-control" id="exampleInputPassword2" placeholder="Password" required/>            
                              </div>
                              <div className="form-group" id="signup-btn">
                                 <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                              </div>
                           </form>
                        </div>
                     </div>
                    </li>
                  </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      )
    }

  }

module.exports = NavBar