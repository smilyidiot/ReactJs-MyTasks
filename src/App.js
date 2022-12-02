import {Component} from 'react'
import {v4} from 'uuid'

import TagsButton from './TagsButton'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
    active: false,
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
    active: false,
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
    active: false,
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
    active: false,
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
    active: false,
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
    active: false,
  },
]

// Replace your code here
class App extends Component {
  state = {
    searchInput: '',
    selectValue: tagsList[0].displayText,
    taskList: [],
  }

  activeTag = tag => {
    const {taskList} = this.state

    const newList = taskList.filter(each => each.taskTab === tag)
    this.setState({taskList: newList})

    console.log('tag', tag, taskList)
  }

  onChangeInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeSelect = event => {
    this.setState({selectValue: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()

    const {searchInput, selectValue} = this.state
    const newTask = {
      id: v4(),
      taskName: searchInput,
      taskTab: selectValue,
      active: false,
    }

    this.setState(prev => ({
      taskList: [...prev.taskList, newTask],
      searchInput: '',
      selectValue: tagsList[0].displayText,
    }))
  }

  render() {
    const {searchInput, taskList, selectValue} = this.state
    // console.log('in render select value', selectValue)
    // console.log('in render list', taskList)

    return (
      <div className="main-container">
        <div className="input-container">
          <h1 className="task-heading">Create a task!</h1>
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <label className="label" htmlFor="task">
              Task
            </label>
            <input
              id="task"
              type="text"
              className="input"
              placeholder="Enter the task here"
              value={searchInput}
              onChange={this.onChangeInput}
            />
            <label className="label" htmlFor="tags">
              Tags
            </label>
            <select
              id="tags"
              value={selectValue}
              className="input"
              onChange={this.onChangeSelect}
            >
              {tagsList.map(each => (
                <option value={each.optionId} key={each.optionId}>
                  {each.displayText}
                </option>
              ))}
            </select>
            <button type="submit" className="button">
              Add Task
            </button>
          </form>
        </div>
        <div className="output-container">
          <h1 className="output-heading">Tags</h1>
          <ul className="tag-buttons">
            {tagsList.map(each => (
              <TagsButton
                key={each.optionId}
                details={each}
                activeTab={this.activeTag}
              />
            ))}
          </ul>
          <h1 className="output-heading">Tasks</h1>
          {taskList.length !== 0 ? (
            <ul className="list">
              {taskList.map(each => (
                <li key={each.id} className="task-item">
                  <h1 className="task-name">{each.taskName}</h1>
                  <p className="task-tab-name">{each.taskTab}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-tasks">No Tasks Added Yet</p>
          )}
        </div>
      </div>
    )
  }
}

export default App
