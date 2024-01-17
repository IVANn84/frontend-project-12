import { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
// import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
// import { useRollbar } from '@rollbar/react';
import { selectorsChannels } from '../../slices/channelsSlice.js';
import { actions as modalsActions } from '../../slices/modalsSlice.js';
import { useSocket } from '../../hooks';

const Rename = () => {
  // const filterWords = useFilter();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const socket = useSocket();
  // const rollbar = useRollbar();
  const inputRef = useRef(null);
  const channalId = useSelector((state) => state.modals.extra.channalId);
  const existingChannels = useSelector(selectorsChannels.selectAll).map(
    ({ name }) => name
  );
  const oldNameChannel =
    useSelector(selectorsChannels.selectAll).find(({ id }) => id === channalId)
      ?.name || '';
  // debugger;

  const formik = useFormik({
    initialValues: { name: oldNameChannel },
    validationSchema: yup.object().shape({
      name: yup
        .string()
        .required('обязательное поле')
        .min(3, 'минимум 3 символа')
        .max(20, 'максимум 20 символов')
        .test(
          'is-unique',
          'Должно быть уникальным',
          (value) => !existingChannels.includes(value)
        ),
    }),
    onSubmit: async ({ name }) => {
      // const filteredRename = filterWords(name);
      try {
        await socket.renameChannel(channalId, name);
        // toast.success(t('notifications.renameChannel'));
        dispatch(modalsActions.closeModal());
      } catch (error) {
        // toast.error(t('notifications.errorRenameChannel'));
        // rollbar.error('RenameChannel', error);
      }
    },
  });

  useEffect(() => {
    inputRef.current.select();
  }, []);

  return (
    <Modal show centered onHide={() => dispatch(modalsActions.closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.renameChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit} controlid="name">
          <Form.Group>
            <Form.Control
              type="text"
              ref={inputRef}
              id="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              disabled={formik.isSubmitting}
              name="name"
              isInvalid={formik.errors.name}
            />
            <Form.Label htmlFor="name" visuallyHidden>
              {t('modal.channelName')}
            </Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => dispatch(modalsActions.closeModal())}
            >
              {t('modal.send')}
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={formik.isSubmitting}
            >
              {t('modal.cancel')}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;
