import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getTasks } from 'app/entities/task/task.reducer';
import { IJob } from 'app/shared/model/job.model';
import { getEntities as getJobs } from 'app/entities/job/job.reducer';
import { ITask } from 'app/shared/model/task.model';
import { getEntity, updateEntity, createEntity, reset } from './task.reducer';

export const TaskUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const tasks = useAppSelector(state => state.task.entities);
  const jobs = useAppSelector(state => state.job.entities);
  const taskEntity = useAppSelector(state => state.task.entity);
  const loading = useAppSelector(state => state.task.loading);
  const updating = useAppSelector(state => state.task.updating);
  const updateSuccess = useAppSelector(state => state.task.updateSuccess);

  const handleClose = () => {
    navigate('/task' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getTasks({}));
    dispatch(getJobs({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...taskEntity,
      ...values,
      dependsOn: tasks.find(it => it.id.toString() === values.dependsOn.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...taskEntity,
          dependsOn: taskEntity?.dependsOn?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="jhipsterSampleApplication12345App.task.home.createOrEditLabel" data-cy="TaskCreateUpdateHeading">
            <Translate contentKey="jhipsterSampleApplication12345App.task.home.createOrEditLabel">Create or edit a Task</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="task-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('jhipsterSampleApplication12345App.task.title')}
                id="task-title"
                name="title"
                data-cy="title"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('jhipsterSampleApplication12345App.task.description')}
                id="task-description"
                name="description"
                data-cy="description"
                type="text"
              />
              <ValidatedField
                label={translate('jhipsterSampleApplication12345App.task.startDate')}
                id="task-startDate"
                name="startDate"
                data-cy="startDate"
                type="date"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('jhipsterSampleApplication12345App.task.endDate')}
                id="task-endDate"
                name="endDate"
                data-cy="endDate"
                type="date"
              />
              <ValidatedField
                label={translate('jhipsterSampleApplication12345App.task.percentCompleted')}
                id="task-percentCompleted"
                name="percentCompleted"
                data-cy="percentCompleted"
                type="text"
                validate={{
                  min: { value: 0, message: translate('entity.validation.min', { min: 0 }) },
                  max: { value: 100, message: translate('entity.validation.max', { max: 100 }) },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                id="task-dependsOn"
                name="dependsOn"
                data-cy="dependsOn"
                label={translate('jhipsterSampleApplication12345App.task.dependsOn')}
                type="select"
              >
                <option value="" key="0" />
                {tasks
                  ? tasks.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.title}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/task" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default TaskUpdate;