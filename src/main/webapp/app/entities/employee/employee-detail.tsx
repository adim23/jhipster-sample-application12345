import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { DurationFormat } from 'app/shared/DurationFormat';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './employee.reducer';

export const EmployeeDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const employeeEntity = useAppSelector(state => state.employee.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="employeeDetailsHeading">
          <Translate contentKey="jhipsterSampleApplication12345App.employee.detail.title">Employee</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{employeeEntity.id}</dd>
          <dt>
            <span id="firstName">
              <Translate contentKey="jhipsterSampleApplication12345App.employee.firstName">First Name</Translate>
            </span>
            <UncontrolledTooltip target="firstName">
              <Translate contentKey="jhipsterSampleApplication12345App.employee.help.firstName" />
            </UncontrolledTooltip>
          </dt>
          <dd>{employeeEntity.firstName}</dd>
          <dt>
            <span id="lastName">
              <Translate contentKey="jhipsterSampleApplication12345App.employee.lastName">Last Name</Translate>
            </span>
          </dt>
          <dd>{employeeEntity.lastName}</dd>
          <dt>
            <span id="fullName">
              <Translate contentKey="jhipsterSampleApplication12345App.employee.fullName">Full Name</Translate>
            </span>
          </dt>
          <dd>{employeeEntity.fullName}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="jhipsterSampleApplication12345App.employee.email">Email</Translate>
            </span>
          </dt>
          <dd>{employeeEntity.email}</dd>
          <dt>
            <span id="phoneNumber">
              <Translate contentKey="jhipsterSampleApplication12345App.employee.phoneNumber">Phone Number</Translate>
            </span>
          </dt>
          <dd>{employeeEntity.phoneNumber}</dd>
          <dt>
            <span id="hireDateTime">
              <Translate contentKey="jhipsterSampleApplication12345App.employee.hireDateTime">Hire Date Time</Translate>
            </span>
          </dt>
          <dd>
            {employeeEntity.hireDateTime ? <TextFormat value={employeeEntity.hireDateTime} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="zonedHireDateTime">
              <Translate contentKey="jhipsterSampleApplication12345App.employee.zonedHireDateTime">Zoned Hire Date Time</Translate>
            </span>
          </dt>
          <dd>
            {employeeEntity.zonedHireDateTime ? (
              <TextFormat value={employeeEntity.zonedHireDateTime} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="hireDate">
              <Translate contentKey="jhipsterSampleApplication12345App.employee.hireDate">Hire Date</Translate>
            </span>
          </dt>
          <dd>
            {employeeEntity.hireDate ? <TextFormat value={employeeEntity.hireDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="salary">
              <Translate contentKey="jhipsterSampleApplication12345App.employee.salary">Salary</Translate>
            </span>
          </dt>
          <dd>{employeeEntity.salary}</dd>
          <dt>
            <span id="commissionPct">
              <Translate contentKey="jhipsterSampleApplication12345App.employee.commissionPct">Commission Pct</Translate>
            </span>
          </dt>
          <dd>{employeeEntity.commissionPct}</dd>
          <dt>
            <span id="duration">
              <Translate contentKey="jhipsterSampleApplication12345App.employee.duration">Duration</Translate>
            </span>
          </dt>
          <dd>
            {employeeEntity.duration ? <DurationFormat value={employeeEntity.duration} /> : null} ({employeeEntity.duration})
          </dd>
          <dt>
            <span id="pict">
              <Translate contentKey="jhipsterSampleApplication12345App.employee.pict">Pict</Translate>
            </span>
          </dt>
          <dd>
            {employeeEntity.pict ? (
              <div>
                {employeeEntity.pictContentType ? (
                  <a onClick={openFile(employeeEntity.pictContentType, employeeEntity.pict)}>
                    <img src={`data:${employeeEntity.pictContentType};base64,${employeeEntity.pict}`} style={{ maxHeight: '30px' }} />
                  </a>
                ) : null}
                <span>
                  {employeeEntity.pictContentType}, {byteSize(employeeEntity.pict)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="comments">
              <Translate contentKey="jhipsterSampleApplication12345App.employee.comments">Comments</Translate>
            </span>
          </dt>
          <dd>{employeeEntity.comments}</dd>
          <dt>
            <span id="cv">
              <Translate contentKey="jhipsterSampleApplication12345App.employee.cv">Cv</Translate>
            </span>
          </dt>
          <dd>
            {employeeEntity.cv ? (
              <div>
                {employeeEntity.cvContentType ? (
                  <a onClick={openFile(employeeEntity.cvContentType, employeeEntity.cv)}>
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                ) : null}
                <span>
                  {employeeEntity.cvContentType}, {byteSize(employeeEntity.cv)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="active">
              <Translate contentKey="jhipsterSampleApplication12345App.employee.active">Active</Translate>
            </span>
          </dt>
          <dd>{employeeEntity.active ? 'true' : 'false'}</dd>
          <dt>
            <Translate contentKey="jhipsterSampleApplication12345App.employee.manager">Manager</Translate>
          </dt>
          <dd>{employeeEntity.manager ? employeeEntity.manager.fullName : ''}</dd>
          <dt>
            <Translate contentKey="jhipsterSampleApplication12345App.employee.department">Department</Translate>
          </dt>
          <dd>{employeeEntity.department ? employeeEntity.department.departmentName : ''}</dd>
        </dl>
        <Button tag={Link} to="/employee" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/employee/${employeeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default EmployeeDetail;
