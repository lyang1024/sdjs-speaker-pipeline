import React, { Component } from 'react';
import { getTalkData, handleSelectStatus, handleSelectOwner, changeTalkStatus, changeTalkOwner, toggleStatusEdit, toggleOwnerEdit, toggleShowMore, deleteTalk, toggleTalkEdit, handleTalkChange, updateTalkInfo } from './TalksActions';
import AdminNav from '../AdminNav/AdminNav';
const moment = require('moment');

const TableRow = ({ data, children }) => {
  return <td>
    {children
      ? children
      : Object.keys(data).map(key =>
        <div className={`table-${key}`}>{data[key]}</div>
      )
    }
  </td>
}

const EditOptions = ({ talkId, handleSelect, name, children, toggleEditProp, handleSubmit, toggleEditFunction }) => {
  return (
    <div className='table-tableAction'>
      <div className='table-tableStatus'>
        <select data-type={name} name={talkId} onChange={handleSelect}>
          <option value=''>Change {name}</option>
          {children}
        </select>
        <div className='side-by-side-btns'>
          <button className='btn' name={talkId} value={toggleEditProp} onClick={handleSubmit}>Save</button>
          <button className='btn' name={talkId} onClick={toggleEditFunction}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

const ShowMore = ({ topic, description, adminNotes, talkId, toggleShowMoreFunction, deleteTalk, toggleTalkEditFunction, toggleTalkEditProp, handleTalkChange, updateTalkInfo }) => {
  return (
    <div>
      {toggleTalkEditProp ?
        <div>
          <i className="fas fa-chevron-left" name={talkId} onClick={toggleTalkEditFunction}></i>
          <div className='table-editTalk'>
            <label>Topic: </label>
            <input defaultValue={topic} name={talkId} data-type={'Topic'} onChange={handleTalkChange} />
            <label>Description: </label>
            <textarea defaultValue={description} name={talkId} data-type={'Description'} onChange={handleTalkChange} />
            <label>Admin Notes: </label>
            <textarea defaultValue={adminNotes} name={talkId} data-type={'Admin Notes'} onChange={handleTalkChange} />
          </div>
          <button className='btn' name={talkId} onClick={updateTalkInfo}>Save</button>
        </div>
        :
        <div>
          <i className="fas fa-chevron-left" name={talkId} onClick={toggleShowMoreFunction}></i>
          <div className='table-editTalk'>
            <label> Topic: </label>
            <div> {topic} </div>
            <label> Description: </label>
            <div> {description} </div>
            <label> Admin Notes: </label>
            <div> {adminNotes} </div>
          </div>
          <i className="far fa-edit" name={talkId} value={toggleTalkEditProp} onClick={toggleTalkEditFunction}></i>
          <i className="fas fa-trash-alt" name={talkId} onClick={deleteTalk}></i>
        </div>
      }
    </div>
  )
}


class Talks extends Component {
  constructor(props) {
    super(props);
    this.handleSelectStatus = this.handleSelectStatus.bind(this)
    this.handleSelectOwner = this.handleSelectOwner.bind(this)
    this.handleSubmitStatus = this.handleSubmitStatus.bind(this)
    this.handleSubmitOwner = this.handleSubmitOwner.bind(this)
    this.toggleStatusEdit = this.toggleStatusEdit.bind(this)
    this.toggleOwnerEdit = this.toggleOwnerEdit.bind(this)
    this.toggleShowMore = this.toggleShowMore.bind(this)
    this.deleteTalk = this.deleteTalk.bind(this)
    this.toggleTalkEdit = this.toggleTalkEdit.bind(this)
    this.handleTalkChange = this.handleTalkChange.bind(this)
    this.updateTalkInfo = this.updateTalkInfo.bind(this)
  }

  componentDidMount() {
    const { dispatch, accessToken } = this.props;
    dispatch(getTalkData(accessToken));
  }

  handleSelectStatus(e) {
    //if (e.target.getAttribute('data-type') === 'Status')
    const { dispatch } = this.props;
    dispatch(handleSelectStatus(e.target.name, e.target.value));
  }

  handleSelectOwner(e) {
    const { dispatch } = this.props;
    dispatch(handleSelectOwner(e.target.name, e.target.value));
  }

  handleSubmitOwner(e) {
    const { dispatch, talkInfo, accessToken } = this.props;
    const selectedTalk = talkInfo.find((talk) => talk.talkId === e.target.name);
    console.log('handle submit args', e.target.name, selectedTalk.selectedOwner, e.target.value)
    dispatch(changeTalkOwner(e.target.name, selectedTalk.selectedOwner, e.target.value, accessToken));
  }

  handleSubmitStatus(e) {
    const { dispatch, talkInfo, accessToken } = this.props;
    const selectedTalk = talkInfo.find((talk) => talk.talkId === e.target.name);
    dispatch(changeTalkStatus(e.target.name, selectedTalk.selectedStatus, e.target.value, accessToken));
  }

  toggleStatusEdit(e) {
    const { dispatch } = this.props;
    dispatch(toggleStatusEdit(e.target.getAttribute('name'), e.target.getAttribute('value')));
  }

  toggleOwnerEdit(e) {
    const { dispatch } = this.props;
    dispatch(toggleOwnerEdit(e.target.getAttribute('name'), e.target.getAttribute('value')));
  }

  toggleShowMore(e) {
    const { dispatch } = this.props;
    dispatch(toggleShowMore(e.target.getAttribute('name'), e.target.getAttribute('value')));
  }

  deleteTalk(e) {
    const { dispatch, accessToken } = this.props;
    dispatch(deleteTalk(e.target.getAttribute('name'), accessToken))
  }

  toggleTalkEdit(e) {
    const { dispatch } = this.props;
    dispatch(toggleTalkEdit(e.target.getAttribute('name'), e.target.getAttribute('value')))
  }

  handleTalkChange(e) {
    const { dispatch } = this.props;
    dispatch(handleTalkChange(e.target.name, e.target.value, e.target.getAttribute('data-type')))
  }

  updateTalkInfo(e) {
    const { dispatch, talkInfo, accessToken } = this.props;
    const selectedTalk = talkInfo.find((talk) => talk.talkId === e.target.name);
    dispatch(updateTalkInfo(e.target.name, selectedTalk.talkChanges.topic, selectedTalk.talkChanges.description, selectedTalk.talkChanges.adminNotes, selectedTalk.toggleTalkEdit, accessToken))
  }

  render() {
    const { talkInfo } = this.props;

    let talks = talkInfo;
    if (this.props.filter) {
      talks = talkInfo.filter(this.props.filter);
    }

    let headers = ['Speaker', 'Talk', 'Event', 'Status', 'Owner']
    if (this.props.include) {
      headers = headers.filter((header) => this.props.include.includes(header))
    }

    if (talks[0]) {
      return (
        <div>
          <table className='table'>
            <tr>
              {
                headers.map(header => (
                  <th>{header}</th>
                ))}
            </tr>
            {
              talks.map((talk, i) =>
                <tr key={i}>
                  {
                    headers.map(column => {
                      switch (column) {
                        case 'Speaker':
                          return <TableRow data={{
                            speaker: talk.speaker,
                            speakerEmail: <a href={`mailto:${talk.speakerEmail}`} target="_top"><i className="far fa-envelope"></i>Send Email</a>,
                            speakerPhone: <div><i className="fas fa-phone"></i>{talk.speakerPhone}</div>
                          }} />
                        case 'Talk':
                          return <TableRow>
                            <div className='options'>
                              {talk.toggleShowMore ?
                                <ShowMore
                                  topic={talk.topic}
                                  description={talk.description}
                                  adminNotes={talk.adminNotes}
                                  talkId={talk.talkId}
                                  toggleShowMoreFunction={this.toggleShowMore}
                                  deleteTalk={this.deleteTalk}
                                  toggleTalkEditFunction={this.toggleTalkEdit}
                                  toggleTalkEditProp={talk.toggleTalkEdit}
                                  handleTalkChange={this.handleTalkChange}
                                  updateTalkInfo={this.updateTalkInfo}
                                />
                                :
                                <div>
                                  {talk.topic}
                                  <div className='table-eventDate'>
                                    <i className="fas fa-plus" name={talk.talkId} value={talk.toggleShowMore} onClick={this.toggleShowMore}></i>
                                    Details
                                </div>
                                </div>
                              }
                            </div>
                          </TableRow>
                        case 'Event':
                          return <TableRow data={{ eventName: talk.eventName, eventDate: moment(talk.eventDate).add(1, 'day').format('YYYY-MM-DD') }} />
                        case 'Status':
                          return <TableRow>
                            <div className='options'>
                              {talk.toggleStatusEdit ?
                                <EditOptions
                                  talkId={talk.talkId}
                                  handleSelect={this.handleSelectStatus}
                                  handleSubmit={this.handleSubmitStatus}
                                  toggleEditFunction={this.toggleStatusEdit}
                                  toggleEditProp={talk.toggleStatusEdit}
                                  name={'Status'}>
                                  <option value='In Contact'>In Contact</option>
                                  <option value='Approve'>Approve</option>
                                  <option value='Deny'>Deny</option>
                                  <option value='Disengaged'>Disengaged</option>
                                </EditOptions>
                                :
                                <div>
                                  {talk.currentStatus}
                                  <i className="far fa-edit" name={talk.talkId} value={talk.toggleStatusEdit} onClick={this.toggleStatusEdit}></i>
                                </div>
                              }
                            </div>
                          </TableRow>
                        case 'Owner':
                          return <TableRow>
                            <div className='options'>
                              {talk.toggleOwnerEdit ?
                                <EditOptions
                                  talkId={talk.talkId}
                                  handleSelect={this.handleSelectOwner}
                                  handleSubmit={this.handleSubmitOwner}
                                  toggleEditFunction={this.toggleOwnerEdit}
                                  toggleEditProp={talk.toggleOwnerEdit}
                                  name={'Owner'}
                                >
                                  <option value='Owner 1'>Owner 1</option>
                                  <option value='Owner 2'>Owner 2</option>
                                  <option value='Owner 3'>Owner 3</option>
                                </EditOptions>
                                :
                                <div>
                                  {talk.owner}
                                  <i className="far fa-edit" name={talk.talkId} value={talk.toggleOwnerEdit} onClick={this.toggleOwnerEdit}></i>
                                </div>
                              }
                            </div>
                          </TableRow>
                        default:
                          return null;
                      }
                    })
                  }
                </tr>)
            }
          </table>
        </div>
      )
    }
    else {
      return (
          <table className='table'>
            <tr>
              {
                headers.map(header => (
                  <th>{header}</th>
                ))}
            </tr>
            <td colspan={headers.length}>There are no speakers.</td>
          </table>
      )
    }
  }
}

export default Talks;