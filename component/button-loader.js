import React, { Component } from "react";
export default class ButtonLoader extends Component {
  state = {
    loading: false
  };

  fetchData = () => {
    this.setState({ loading: true });

    //Faking API call here
    setTimeout(() => {
      this.setState({ loading: false });
    },3000 );
  };

  render() {
    const { loading } = this.state;

    return (
      <div>
        <button className="button btn-danger" onClick={this.fetchData} style={{background:"#fbd07a",width:"208px",height:"62px",fontWeight:"bold",borderRadius:"5px"}}  disabled={loading}>
          {loading && (
            <i
              className="fa fa-spinner fa-spin"
              style={{ marginRight: "10px" }}
            />
          )}
          {loading && <span>Submitting</span>}
          {!loading && <span>Submit</span>}
        </button>
      </div>
    );
  }
}