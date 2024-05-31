import React, { useState, useEffect } from 'react';
import Column from './Column';
import folderPlusIcon from '../assets/folderPlus-icon.svg';


const TravelChecklist = ({ selectedList, duplicateList, duplicateTarget }) => {
    // State management
    const [lists, setLists] = useState({});


    useEffect(() => {
        // initialize selected list or create new list if it doesn't exist
        if (selectedList && !lists[selectedList.id]) {
            setLists(prevLists => ({
                ...prevLists, 
                [selectedList.id]: {
                    checkList: [],
                    categoryList: [], 
                    columnCount: 3 // initial column count
                }
            }));
        }
    }, [selectedList, lists]);

    useEffect(() => {
        // if list is duplicated, copy items
        if (duplicateList && duplicateTarget) {
            setLists(prevLists => ({
                ...prevLists, 
                [duplicateTarget.id]: prevLists[duplicateList.id]
            }));
        };
    }, [duplicateList, duplicateTarget]);

    // Destructure selected list state for easier access
    const { checkList = [], categoryList = [], columnCount = 3 } = selectedList ? lists[selectedList.id] || {} : {};

    // State update functions
    const setListState = (listId, updatedProperties) => {
        setLists(prevLists => ({
            ...prevLists,
            [listId]: {
                ...prevLists[listId],
                ...updatedProperties
            }
        }));
    };

    const addCategory = () => {
        const newCategory = { id: Date.now(), name: 'New Column', column: categoryList.length % columnCount };
        setListState(selectedList.id, {
            categoryList: [...categoryList, newCategory]
        });
    };

    const removeCategory = (categoryId) => {
        setListState(selectedList.id, {
            categoryList: categoryList.filter(cat => cat.id !== categoryId)
        });
    };

    const addChecklistItem = (categoryId) => {
        setListState(selectedList.id, {
            checkList: [...checkList, { id: Date.now(), text: '', checked: false, categoryId }]
        });
    };

    const updateChecklistItemText = (id, newText) => {
        setListState(selectedList.id, {
            checkList: checkList.map(item =>
                item.id === id ? { ...item, text: newText } : item
            )
        });
    };

    const toggleChecklistItemChecked = (id) => {
        setListState(selectedList.id, {
            checkList: checkList.map(item =>
                item.id === id ? { ...item, checked: !item.checked } : item
            )
        });
    };

    const removeChecklistItem = (id) => {
        setListState(selectedList.id, {
            checkList: checkList.filter(item => item.id !== id)
        });
    };

    useEffect(() => {
        const handleResize = () => {
            // Determine the number of columns based on window width
            const newColumnCount = window.innerWidth <= 900 ? 1 : 3;
            setListState(selectedList.id, {
                columnCount: newColumnCount
            });

            // Update column indexes of all categories
            const updatedCategoryList = categoryList.map((category, index) => ({
                ...category,
                column: newColumnCount === 1 ? 1 : index % newColumnCount
            }));
            setListState(selectedList.id, {
                categoryList: updatedCategoryList
            });
        };

        // Initial column count based on window width
        handleResize();

        // Event listener for window resize
        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, [selectedList, categoryList]);

    const handleInputChange = (id, event) => {
        updateChecklistItemText(id, event.target.value);
        autoResizeTextarea(event.target);
    };

    const autoResizeTextarea = (element) => {
        element.style.height = 'auto'; // Reset the height
        element.style.height = element.scrollHeight + 'px'; // Set it to the scroll height
    };

    useEffect(() => {
        // Initialize auto-resize for all textareas on component mount
        checkList.forEach(item => {
            const textarea = document.getElementById(`textarea-${item.id}`);
            if (textarea) {
                autoResizeTextarea(textarea);
            }
        });
    }, [checkList]);

    return (
        <div className='travelChecklistSection' style={{ padding: '20px', width: '100%' }}>
            <div className='hover-box' 
                onClick={addCategory} 
                style={{ 
                    width: '15%', 
                    cursor: 'pointer', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    marginTop: 'auto',
                    marginBottom: '25px',
                    fontSize: '90%',
                    border: 'solid red'
                }}>
                <img src={folderPlusIcon} alt='추가' style={{ width: '20px', height: '20px', marginRight: '7px' }} /> 
                카테고리 추가
            </div>
            <div className='columns'>
            {[0, 1, 2].map(column => (
                <>
                <Column
                    key={column}
                    column={column}
                    categoryList={categoryList}
                    checkList={checkList}
                    selectedList={selectedList}
                    setListState={setListState}
                    addCategory={addCategory}
                    addChecklistItem={addChecklistItem}
                    removeCategory={removeCategory}
                    removeChecklistItem={removeChecklistItem}
                    toggleChecklistItemChecked={toggleChecklistItemChecked}
                    handleInputChange={handleInputChange}
                />
                {column !== 2 && <div className="column-divider"></div>}
                </>
            ))}
            </div>
        </div>
        );
      
};

export default TravelChecklist;
