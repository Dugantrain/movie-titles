import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
import * as TitleStore from '../store/title';

// At runtime, Redux will merge together...
type TitleProps =
  TitleStore.TitleState // ... state we've requested from the Redux store
  & typeof TitleStore.actionCreators // ... plus action creators we've requested
  & RouteComponentProps<{ titleId: string }>; // ... plus incoming routing parameters


class Title extends React.PureComponent<TitleProps> {


  // This method is called when the component is first added to the document
  public componentDidMount() {
    this.props.requestTitleById(this.props.match.params.titleId);
  }

  public render() { 
    return (
      <React.Fragment>
        {this.renderTitleInfo()}
      </React.Fragment>
    );
  }

  private renderTitleInfo() {
    return (
      <div>
        {!this.props.isLoading &&
          <div>
            <h1>{this.props.titleDetail.title.titleName}</h1>
            <div className="row">
              {this.props.titleDetail.storyLines.map((storyLine: TitleStore.StoryLine) =>
              <div key={storyLine.id}>
                <div className="card mb-2">
                  <div className="card-body">
                    <h5 className="card-title">{storyLine.language}</h5>
                    <p className="card-text">{storyLine.description}</p>
                  </div>
                </div>
              </div>)}
          </div>
          </div>
        }
        {this.props.isLoading &&
          <div className="row justify-content-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default connect(
  (state: ApplicationState) => state.title, // Selects which state properties are merged into the component's props
  TitleStore.actionCreators // Selects which action creators are merged into the component's props
)(Title as any);
