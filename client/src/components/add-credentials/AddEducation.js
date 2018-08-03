import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextField';
import TextAreaFieldGroup from '../common/TextAreaField';
import { addEducation } from '../../actions/profileActions';


class AddEducation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      school: '',
      degree: '',
      field_of_study: '',
      from: '',
      to: '',
      current: false,
      disabled: false,
      description: '',
      errors: {}
    }
    this.onCheck = this.onCheck.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onCheck(e) {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const eduData = {
      school: this.state.school,
      degree: this.state.degree,
      field_of_study: this.state.field_of_study,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    }
    this.props.addEducation(eduData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Education</h1>
              <p className="lead text-center">Add any school or college that you attended</p>
              <small className="d-block pb-3">* = required fields</small>

              <form onSubmit={ this.onSubmit }>

                <TextFieldGroup
                  placeholder="* School"
                  name="school"
                  value={ this.state.school }
                  onChange={ this.onChange }
                  error={ errors.school }
                />
                <TextFieldGroup
                  placeholder="* Degree"
                  name="degree"
                  value={ this.state.degree }
                  onChange={ this.onChange }
                  error={ errors.degree }
                />
                <TextFieldGroup
                  placeholder="* Field of Study"
                  name="field_of_study"
                  value={ this.state.field_of_study }
                  onChange={ this.onChange }
                  error={ errors.field_of_study }
                />
                <h6>From Date</h6>
                <TextFieldGroup
                  name="from"
                  type="date"
                  value={ this.state.from }
                  onChange={ this.onChange }
                  error={ errors.from }
                />
                <h6>To Date</h6>
                <TextFieldGroup
                  name="to"
                  type="date"
                  value={ this.state.to }
                  onChange={ this.onChange }
                  error={ errors.to }
                  disabled={ this.state.disabled ? 'disabled' : '' }
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    value={ this.state.current }
                    checked={ this.state.current }
                    onChange={ this.onCheck }
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Current Degree
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder="Degree/Course Description"
                  name="description"
                  value={ this.state.description }
                  onChange={ this.onChange }
                  error={ errors.description }
                  info="Tell us a little about the course."
                />
                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
})

export default connect(mapStateToProps, { addEducation })(withRouter(AddEducation));
