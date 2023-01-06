import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getFiles } from 'app/entities/files/files.reducer';
import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IFiles } from 'app/shared/model/files.model';
import { FileType } from 'app/shared/model/enumerations/file-type.model';
import { getEntity, updateEntity, createEntity, reset } from './files.reducer';

export const FilesUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const files = useAppSelector(state => state.files.entities);
  const users = useAppSelector(state => state.userManagement.users);
  const filesEntity = useAppSelector(state => state.files.entity);
  const loading = useAppSelector(state => state.files.loading);
  const updating = useAppSelector(state => state.files.updating);
  const updateSuccess = useAppSelector(state => state.files.updateSuccess);
  const fileTypeValues = Object.keys(FileType);

  const handleClose = () => {
    navigate('/files' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getFiles({}));
    dispatch(getUsers({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...filesEntity,
      ...values,
      parent: files.find(it => it.id.toString() === values.parent.toString()),
      createdBy: users.find(it => it.id.toString() === values.createdBy.toString()),
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
          fileType: 'FOLDER',
          ...filesEntity,
          parent: filesEntity?.parent?.id,
          createdBy: filesEntity?.createdBy?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="jhipsterSampleApplication12345App.files.home.createOrEditLabel" data-cy="FilesCreateUpdateHeading">
            <Translate contentKey="jhipsterSampleApplication12345App.files.home.createOrEditLabel">Create or edit a Files</Translate>
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
                  id="files-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('jhipsterSampleApplication12345App.files.uuid')}
                id="files-uuid"
                name="uuid"
                data-cy="uuid"
                type="text"
              />
              <ValidatedField
                label={translate('jhipsterSampleApplication12345App.files.filename')}
                id="files-filename"
                name="filename"
                data-cy="filename"
                type="text"
              />
              <ValidatedField
                label={translate('jhipsterSampleApplication12345App.files.fileType')}
                id="files-fileType"
                name="fileType"
                data-cy="fileType"
                type="select"
              >
                {fileTypeValues.map(fileType => (
                  <option value={fileType} key={fileType}>
                    {translate('jhipsterSampleApplication12345App.FileType.' + fileType)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('jhipsterSampleApplication12345App.files.fileSize')}
                id="files-fileSize"
                name="fileSize"
                data-cy="fileSize"
                type="text"
              />
              <ValidatedField
                label={translate('jhipsterSampleApplication12345App.files.createDate')}
                id="files-createDate"
                name="createDate"
                data-cy="createDate"
                type="date"
              />
              <ValidatedField
                label={translate('jhipsterSampleApplication12345App.files.filePath')}
                id="files-filePath"
                name="filePath"
                data-cy="filePath"
                type="text"
              />
              <ValidatedField
                label={translate('jhipsterSampleApplication12345App.files.version')}
                id="files-version"
                name="version"
                data-cy="version"
                type="text"
              />
              <ValidatedField
                label={translate('jhipsterSampleApplication12345App.files.mime')}
                id="files-mime"
                name="mime"
                data-cy="mime"
                type="text"
              />
              <ValidatedField
                id="files-parent"
                name="parent"
                data-cy="parent"
                label={translate('jhipsterSampleApplication12345App.files.parent')}
                type="select"
              >
                <option value="" key="0" />
                {files
                  ? files.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.filename}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="files-createdBy"
                name="createdBy"
                data-cy="createdBy"
                label={translate('jhipsterSampleApplication12345App.files.createdBy')}
                type="select"
              >
                <option value="" key="0" />
                {users
                  ? users.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.login}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/files" replace color="info">
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

export default FilesUpdate;
