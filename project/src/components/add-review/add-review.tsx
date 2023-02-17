import Modal from 'react-modal';
import { useAppDispatch } from '../../hooks';
import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { postReview } from '../../store/api-actions';
import { USER_REVIEW } from '../../const';

const RATINGS = ['Отлично', 'Хорошо', 'Нормально', 'Плохо', 'Ужасно'];

type AddReviewProps = {
  isModalOpened: boolean;
  onCloseModal: () => void;
  cameraId: number;
  openSuccessPostModal: () => void;
};

function AddReview ({isModalOpened, onCloseModal, cameraId, openSuccessPostModal}: AddReviewProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [userReview, setUserReview] = useState({
    userName: '',
    advantage: '',
    disadvantage: '',
    review: '',
    rating: 0,
  });

  const [validation, setValidation] = useState({
    isUserNameValid: false,
    isAdvantageValid: false,
    isDisadvantageValid: false,
    isReviewValid: false,
    isRatingValid: false,
  });

  const [isFormValid, setFormValid] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const dataChangeHandle = (
    evt: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = evt.target;
    setUserReview({ ...userReview, [USER_REVIEW[name]]: value });
  };

  const handleSuccessPostReview = () => {
    onCloseModal();
    openSuccessPostModal();
  };

  const handlePostReview = (evt: FormEvent<HTMLElement>) => {
    evt.preventDefault();
    setIsSending(true);
    if (isFormValid) {
      const { userName, advantage, disadvantage, review, rating } = userReview;
      dispatch(postReview({
        cameraId: cameraId,
        userName: userName,
        advantage: advantage,
        disadvantage: disadvantage,
        review: review,
        rating: Number(rating)}
      ));
      setUserReview({
        userName: '',
        advantage: '',
        disadvantage: '',
        review: '',
        rating: 0,
      });
      setIsSending(false);
      handleSuccessPostReview();
    }
  };

  useEffect(() => {
    const checkValidation = () => {
      setValidation({
        isUserNameValid: userReview.userName.length > 0,
        isAdvantageValid: userReview.advantage.length > 0,
        isDisadvantageValid: userReview.disadvantage.length > 0,
        isReviewValid: userReview.review.length >= 5,
        isRatingValid: Number(userReview.rating) > 0,
      });
    };
    checkValidation();
  },[userReview]);

  useEffect(() => {
    const checkAllFieldsValid = () => {
      for (const value of Object.values(validation)) {
        if (!value) {
          setFormValid(false);
          return false;
        }
      }
      setFormValid(true);
      return true;
    };
    checkAllFieldsValid();
  },[validation]);

  return (
    <Modal
      ariaHideApp = { false }
      shouldCloseOnOverlayClick
      isOpen = { isModalOpened }
      onRequestClose = { onCloseModal }
      bodyOpenClassName = { 'scroll-lock' }
      className = { 'is-active' }
      overlayClassName = { 'is-active' }
    >
      <div className="modal is-active">
        <div className="modal__wrapper">
          <div className="modal__overlay"
            onClick = { onCloseModal }
          >
          </div>
          <div className="modal__content">
            <p className="title title--h4">Оставить отзыв</p>
            <div className="form-review">
              <form method="post"
                onSubmit = { handlePostReview }
              >
                <div className="form-review__rate">
                  <fieldset className={ !(!validation.isRatingValid && isSending) ? 'rate form-review__item' : 'rate form-review__item is-invalid'}>
                    <legend className="rate__caption">Рейтинг
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </legend>
                    <div className="rate__bar">
                      <div className="rate__group">
                        {RATINGS.map((rating, i) =>
                          (
                            <React.Fragment key={`${RATINGS.length - i}-stars`}>
                              <input className="visually-hidden" id={`star-${RATINGS.length - i}`} name="rate" type="radio" value={RATINGS.length - i}
                                checked = { userReview.rating.toString() === (RATINGS.length - i).toString() }
                                onChange = { dataChangeHandle }
                              />
                              <label className="rate__label" htmlFor={`star-${RATINGS.length - i}`} title={RATINGS[RATINGS.length - i]}></label>
                            </React.Fragment>
                          ))}
                      </div>
                      <div className="rate__progress"><span className="rate__stars">{userReview.rating}</span> <span>/</span> <span className="rate__all-stars">5</span>
                      </div>
                    </div>
                    <p className="rate__message">Нужно оценить товар</p>
                  </fieldset>
                  <div className={!(!validation.isUserNameValid && isSending) ? 'custom-input form-review__item' : 'custom-input form-review__item is-invalid'}>
                    <label>
                      <span className="custom-input__label">Ваше имя
                        <svg width="9" height="9" aria-hidden="true">
                          <use xlinkHref="#icon-snowflake"></use>
                        </svg>
                      </span>
                      <input type="text" name="user-name" placeholder="Введите ваше имя"
                        onChange = { dataChangeHandle }
                        value = { userReview.userName }
                      />
                    </label>
                    <p className="custom-input__error">Нужно указать имя</p>
                  </div>
                  <div className={!(!validation.isAdvantageValid && isSending) ? 'custom-input form-review__item' : 'custom-input form-review__item is-invalid'}>
                    <label>
                      <span className="custom-input__label">Достоинства
                        <svg width="9" height="9" aria-hidden="true">
                          <use xlinkHref="#icon-snowflake"></use>
                        </svg>
                      </span>
                      <input type="text" name="user-plus" placeholder="Основные преимущества товара"
                        onChange = { dataChangeHandle }
                        value = { userReview.advantage }
                      />
                    </label>
                    <p className="custom-input__error">Нужно указать достоинства</p>
                  </div>
                  <div className={!(!validation.isDisadvantageValid && isSending) ? 'custom-input form-review__item' : 'custom-input form-review__item is-invalid'}>
                    <label>
                      <span className="custom-input__label">Недостатки
                        <svg width="9" height="9" aria-hidden="true">
                          <use xlinkHref="#icon-snowflake"></use>
                        </svg>
                      </span>
                      <input type="text" name="user-minus" placeholder="Главные недостатки товара"
                        onChange = { dataChangeHandle }
                        value = { userReview.disadvantage }
                      />
                    </label>
                    <p className="custom-input__error">Нужно указать недостатки</p>
                  </div>
                  <div className={!(!validation.isReviewValid && isSending) ? 'custom-textarea form-review__item' : 'custom-textarea form-review__item is-invalid'}>
                    <label>
                      <span className="custom-textarea__label">Комментарий
                        <svg width="9" height="9" aria-hidden="true">
                          <use xlinkHref="#icon-snowflake"></use>
                        </svg>
                      </span>
                      <textarea name="user-comment" placeholder="Поделитесь своим опытом покупки"
                        onChange = { dataChangeHandle }
                        value = { userReview.review }
                      >
                      </textarea>
                    </label>
                    <div className="custom-textarea__error">Нужно добавить комментарий</div>
                  </div>
                </div>
                <button className="btn btn--purple form-review__btn" type="submit">
                Отправить отзыв
                </button>
              </form>
            </div>
            <button className="cross-btn" type="button" aria-label="Закрыть попап"
              onClick={onCloseModal}
            >
              <svg width="10" height="10" aria-hidden="true">
                <use xlinkHref="#icon-close"></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default AddReview;
