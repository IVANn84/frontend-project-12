import React, { useEffect, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAuth, useSocket } from '../../hooks/index.js';
import SendMessageIcon from '../../icons/SendMessagesIcons.jsx';

const NewMessageForm = () => {
  const { t } = useTranslation();
  const socket = useSocket();
  const {
    loggedIn: { username },
  } = useAuth();
  const inputRef = useRef(null);

  const currentChannelId = useSelector(
    (state) => state.channels.currentChannelId,
  );

  const formik = useFormik({
    initialValues: { messageBody: '' },
    onSubmit: ({ messageBody }, { resetForm }) => {
      try {
        socket.newMessage({
          body: messageBody,
          channelId: currentChannelId,
          username,
        });

        resetForm();
      } catch (error) {
        console.error(error);
      }
    },
    validationSchema: yup.object().shape({
      messageBody: yup.string().required(),
    }),
  });
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentChannelId]);

  useEffect(() => {
    if (formik.values.messageBody === '') {
      inputRef.current.focus();
    }
  }, [formik.values.messageBody]);

  return (
    <div className="mt-auto px-5 py-3">
      <Form
        onSubmit={formik.handleSubmit}
        noValidate
        className="py-1 border rounded-2"
      >
        <Form.Group className="input-group">
          <Form.Control
            ref={inputRef}
            name="messageBody"
            autoComplete="off"
            aria-label={t('newMessage')}
            placeholder={t('chat.newMessagePlaceholder')}
            className="border-0 p-0 ps-2"
            onChange={formik.handleChange}
            value={formik.values.messageBody}
            disabled={formik.isSubmitting}
          />
          <Button
            type="submit"
            variant="light"
            className="border-0"
            disabled={formik.isSubmitting}
          >
            <SendMessageIcon />
            <span className="visually-hidden">{t('send')}</span>
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default NewMessageForm;
