import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import dropdownIcon from '../../../assets/icons/dropdownIcon.svg';
import globalsSelectors from '../../../redux/features/globalState/globalsSelectors';
import { Button } from '../../atoms/buttons/Button';
import TextRoboto from '../../atoms/typography/TextRoboto';
import { PopoverOverlay } from '../../molecules/overlays/Overlay';
import { Popover } from '../../molecules/Popover/inex';
import PopoverBody from '../../molecules/Popover/PopoverBody';
import PopoverTrigger from '../../molecules/Popover/PopoverTrigger';
import CurrencyList from '../popovers/CurrencyList';

class CurrencySwitcher extends Component {
  render() {
    const { isOpen, onToggle, currency } = this.props;

    const className = classNames('nav__btn_dropdown', {
      'nav__btn_dropdown--opened': isOpen,
    });

    return (
      <Popover onClick={onToggle} className={'currency_popover'}>
        <PopoverOverlay isOpen={isOpen} cb={onToggle} />
        <PopoverTrigger>
          <Button className="nav__btn_currency">
            <TextRoboto className="text--big text--light -pr-4">
              {currency.symbol}
            </TextRoboto>
            <img
              src={dropdownIcon}
              className={className}
              alt="currentcy change dropwdown"
            />
          </Button>
        </PopoverTrigger>
        <PopoverBody isOpen={isOpen}>
          <CurrencyList onClose={onToggle} />
        </PopoverBody>
      </Popover>
    );
  }
}

CurrencySwitcher.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

/** Export */
const mapStateToProps = (state) => ({
  currency: globalsSelectors.getCurrency(state),
});

const withRedux = connect(mapStateToProps);

export default withRedux(CurrencySwitcher);
