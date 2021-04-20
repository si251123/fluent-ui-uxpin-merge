import * as React from 'react';
import * as PropTypes from 'prop-types';
import { PrimaryButton as PrimaryButtonM, DefaultButton as DefaultButtonM } from '@fluentui/react/lib/Button';
import { TooltipHost } from '@fluentui/react/lib/Tooltip';

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    let iconProps = { iconName: this.props.iconName }

    if (this.props.iconPosition === "end") styles.flexContainer = {
      flexDirection: 'row-reverse'
    }

    const tooltipId = _.uniqueId('tooltip_');

    return (
      <div>
        <TooltipHost
          content={this.props.tooltip}
          id={tooltipId}
        >
          {this.props.primary ?
            <PrimaryButtonM
              {...this.props}
              iconProps={iconProps}
              aria-describedby={tooltipId}
            />
            :
            <DefaultButtonM
              {...this.props}
              iconProps={iconProps}
              aria-describedby={tooltipId}
            />
          }
        </TooltipHost>
      </div>
    );
  }

}


/**
 * Set up the properties to be available in the UXPin property inspector.
 */
Button.propTypes = {

  /**
   * @uxpindescription The displayed text on the button
   * @uxpinpropname Text
   * */
  text: PropTypes.string,

  /**
   * @uxpindescription To display the button in the filled style. Otherwise, displays in the outline style
   * @uxpinpropname Primary Style
   * */
  primary: PropTypes.bool,

  /**
   * @uxpindescription The exact name from the Fluent icon library (Optional)
   * @uxpinpropname Icon Name
   * */
  iconName: PropTypes.string,

  /**
   * @uxpindescription To disable the control
   * @uxpinpropname Disabled
   * */
  disabled: PropTypes.bool,

  /**
   * @uxpindescription The location to display an icon, if one is set
   * @uxpinpropname Icon Position
   * */
  iconPosition: PropTypes.oneOf(['start', 'end']),

  /**
   * @uxpindescription Tooltip for the control
   * @uxpinpropname Tooltip
   * */
  tooltip: PropTypes.string,

  /**
   * @uxpindescription Fires when the button is clicked on.
   * @uxpinpropname Click
   * */
  onClick: PropTypes.func,
};


/**
 * Set the default values for this control in the UXPin Editor.
 */
Button.defaultProps = {
  primary: true,
  disabled: false,
  iconName: "Home",
  iconPosition: "start",
  text: "Hello! PP Fluent!",
  tooltip: 'This is a tooltip',
};


export { Button as default };
