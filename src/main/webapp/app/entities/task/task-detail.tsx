import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './task.reducer';

export const TaskDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const taskEntity = useAppSelector(state => state.task.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="taskDetailsHeading">
          <Translate contentKey="jhipsterSampleApplication12345App.task.detail.title">Task</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{taskEntity.id}</dd>
          <dt>
            <span id="title">
              <Translate contentKey="jhipsterSampleApplication12345App.task.title">Title</Translate>
            </span>
          </dt>
          <dd>{taskEntity.title}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="jhipsterSampleApplication12345App.task.description">Description</Translate>
            </span>
          </dt>
          <dd>{taskEntity.description}</dd>
          <dt>
            <span id="startDate">
              <Translate contentKey="jhipsterSampleApplication12345App.task.startDate">Start Date</Translate>
            </span>
          </dt>
          <dd>{taskEntity.startDate ? <TextFormat value={taskEntity.startDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="endDate">
              <Translate contentKey="jhipsterSampleApplication12345App.task.endDate">End Date</Translate>
            </span>
          </dt>
          <dd>{taskEntity.endDate ? <TextFormat value={taskEntity.endDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="percentCompleted">
              <Translate contentKey="jhipsterSampleApplication12345App.task.percentCompleted">Percent Completed</Translate>
            </span>
          </dt>
          <dd>{taskEntity.percentCompleted}</dd>
          <dt>
            <Translate contentKey="jhipsterSampleApplication12345App.task.dependsOn">Depends On</Translate>
          </dt>
          <dd>{taskEntity.dependsOn ? taskEntity.dependsOn.title : ''}</dd>
        </dl>
        <Button tag={Link} to="/task" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/task/${taskEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default TaskDetail;
