
import React, { Component } from 'react';


export default class Edit extends Component {

   render() {
    return (
        <div style={{ marginTop: 10 }}>
            <h3 align="center">Update User </h3>
            <form>
                <div className="form-group">
                    <label>Name:  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value="Name"
                      />
                </div>
                <div className="form-group">
                    <input type="submit" 
                      value="Update User" 
                      className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
  }
}