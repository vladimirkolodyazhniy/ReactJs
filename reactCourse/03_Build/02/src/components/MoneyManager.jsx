import React, { Component } from 'react';

import ControlsPanel from './ControlsPanel.jsx';
import NoteEditor from './NoteEditor.jsx';
import NotesList from './NotesList.jsx';
import Modal from './Modal.jsx';
import FiltersPanel from './FiltersPanel.jsx';
import StatisticPanel from './StatisticPanel.jsx';

import styles from './MoneyManager.css';

export default class MoneyManager extends Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: [],
            totalAmount: 0,
            modalToggle: false,
            noteCategory: '',
            activeFilter: 'all'
        };

        this.handleNoteAdd = this.handleNoteAdd.bind(this);
        this.handleModalToggle = this.handleModalToggle.bind(this);
        this.handleCategoryFilter = this.handleCategoryFilter.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
        this.getNotes = this.getNotes.bind(this);
        this.handleNodeDelete = this.handleNodeDelete.bind(this);
        this.updateStorage = this.updateStorage.bind(this);
    }

    componentWillMount() {
        const savedNotes = this.getNotes();

        const totalAmount = Number(localStorage.getItem('totalAmount'));

        if (savedNotes && totalAmount) {
            this.setState({
                totalAmount,
                notes: savedNotes
            });
        }
    }

    handleNoteAdd(newNote) {
        const savedNotes = this.getNotes();

        this.setState({
            notes: [newNote, ...savedNotes],
            totalAmount: this.state.totalAmount + newNote.moneyAmount
        }, () => {
            this.updateStorage();

            this.applyFilter();
        });
    }

    updateStorage() {
        const notes = JSON.stringify(this.state.notes);

        localStorage.setItem('notes', notes);
        localStorage.setItem('totalAmount', this.state.totalAmount);
    }

    handleModalToggle(category) {
        this.setState({
            modalToggle: !this.state.modalToggle,
            noteCategory: category
        });
    }

    applyFilter() {
        const savedNotes = this.getNotes();

        const { activeFilter } = this.state;

        this.setState({
            notes: activeFilter !== 'all' ? savedNotes.filter(note => note.category === activeFilter) : savedNotes
        });
    }

    getNotes() {
        return JSON.parse(localStorage.getItem('notes')) || [];
    }

    handleCategoryFilter(event) {
        this.setState({
            activeFilter: event.target.dataset.filter
        }, () => {
            this.applyFilter();
        });
    }

    handleNodeDelete(nodeId) {
        const { notes } = this.state;
        
        const amount = notes.filter(note => note.id === nodeId);

        this.setState({
            notes: this.state.notes.filter(note => note.id !== nodeId),
            totalAmount: this.state.totalAmount - amount[0].moneyAmount
        }, () => {
            this.updateStorage();

            this.applyFilter();
        });
    }

    render() {
        const {
            notes,
            totalAmount,
            modalToggle,
            noteCategory,
            activeFilter
        } = this.state;

        return (
            <div className={styles.app}>
                <header className={styles.header}>
                    <h1><i className="fa fa-credit-card" aria-hidden="true"></i> Money Manager</h1>
                </header>

                <ControlsPanel
                    totalAmount={totalAmount}
                    onModalShow={this.handleModalToggle}
                />

                { this.getNotes().length > 0 ?
                    <StatisticPanel notes={this.getNotes()} />
                    : null
                }

                <FiltersPanel onCategoryFilter={this.handleCategoryFilter} activeFilter={activeFilter}/>

                <NotesList
                    notes={notes}
                    onNoteDelete={this.handleNodeDelete}
                />

                <Modal showModal={modalToggle}>
                    <NoteEditor onNoteAdd={this.handleNoteAdd} onNoteCancel={this.handleModalToggle} noteCategory={noteCategory}/>
                </Modal>
            </div>
        );
    }
}
