import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './files.reducer';

export const FilesDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const filesEntity = useAppSelector(state => state.files.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="filesDetailsHeading">
          <Translate contentKey="jhipsterSampleApplication12345App.files.detail.title">Files</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{filesEntity.id}</dd>
          <dt>
            <span id="uuid">
              <Translate contentKey="jhipsterSampleApplication12345App.files.uuid">Uuid</Translate>
            </span>
          </dt>
          <dd>{filesEntity.uuid}</dd>
          <dt>
            <span id="filename">
              <Translate contentKey="jhipsterSampleApplication12345App.files.filename">Filename</Translate>
            </span>
          </dt>
          <dd>{filesEntity.filename}</dd>
          <dt>
            <span id="fileType">
              <Translate contentKey="jhipsterSampleApplication12345App.files.fileType">File Type</Translate>
            </span>
          </dt>
          <dd>{filesEntity.fileType}</dd>
          <dt>
            <span id="fileSize">
              <Translate contentKey="jhipsterSampleApplication12345App.files.fileSize">File Size</Translate>
            </span>
          </dt>
          <dd>{filesEntity.fileSize}</dd>
          <dt>
            <span id="createDate">
              <Translate contentKey="jhipsterSampleApplication12345App.files.createDate">Create Date</Translate>
            </span>
          </dt>
          <dd>
            {filesEntity.createDate ? <TextFormat value={filesEntity.createDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="filePath">
              <Translate contentKey="jhipsterSampleApplication12345App.files.filePath">File Path</Translate>
            </span>
          </dt>
          <dd>{filesEntity.filePath}</dd>
          <dt>
            <span id="version">
              <Translate contentKey="jhipsterSampleApplication12345App.files.version">Version</Translate>
            </span>
          </dt>
          <dd>{filesEntity.version}</dd>
          <dt>
            <span id="mime">
              <Translate contentKey="jhipsterSampleApplication12345App.files.mime">Mime</Translate>
            </span>
          </dt>
          <dd>{filesEntity.mime}</dd>
          <dt>
            <Translate contentKey="jhipsterSampleApplication12345App.files.parent">Parent</Translate>
          </dt>
          <dd>{filesEntity.parent ? filesEntity.parent.filename : ''}</dd>
          <dt>
            <Translate contentKey="jhipsterSampleApplication12345App.files.createdBy">Created By</Translate>
          </dt>
          <dd>{filesEntity.createdBy ? filesEntity.createdBy.login : ''}</dd>
        </dl>
        <Button tag={Link} to="/files" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/files/${filesEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default FilesDetail;
