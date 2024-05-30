import React, { useState, useEffect } from 'react';
import plusIcon from '../assets/plus-icon.svg';
import folderPlusIcon from '../assets/folderPlus-icon.svg';
import Checkbox from './checkboxes/Checkbox';
import UnCheckbox from './checkboxes/UnCheckbox';

const TravelChecklist = ({ selectedList }) => {
    // State management
    const [lists, setLists] = useState({});
    // const [checkList, setCheckList] = useState([]);
    // const [categoryList, setCategoryList] = useState([]);
    // const [columnCount, setColumnCount] = useState(3); // Track the current column for the next category

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

    // destructure selected list state for easier access
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
        const newCategory = { id: Date.now(), text: '', column: categoryList.length % columnCount };
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

    // const addCategory = () => {
    //     const newCategory = { id: Date.now(), text: '', column: categoryList.length % columnCount };
    //     setCategoryList([...categoryList, newCategory]);
    // };

    // const removeCategory = (categoryId) => {
    //     setCategoryList(categoryList.filter(cat => cat.id !== categoryId))
    // }

    // const addChecklistItem = (categoryId) => {
    //     setCheckList([...checkList, { id: Date.now(), text: '', checked: false, categoryId }]);
    // };

    // const updateChecklistItemText = (id, newText) => {
    //     setCheckList(checkList.map(item => 
    //         item.id === id ? { ...item, text: newText } : item
    //     ));
    // };

    // const toggleChecklistItemChecked = (id) => {
    //     setCheckList(checkList.map(item =>
    //         item.id === id ? { ...item, checked: !item.checked } : item
    //     ));
    // };

    // const removeChecklistItem = (id) => {
    //     setCheckList(checkList.filter(item => item.id !== id));
    // };


    useEffect(() => {
        const handleResize = () => {
            // Determine the number of columns based on window width
            const newColumnCount = window.innerWidth <= 900 ? 1 : 3;
            setListState(selectedList.id, {
                columnCount: newColumnCount
            });
            // setColumnCount(newColumnCount);

            // Update column indexes of all categories
            const updatedCategoryList = categoryList.map((category, index) => ({
                ...category,
                column: newColumnCount === 1 ? 1 : index % newColumnCount
            }));
            setListState(selectedList.id, {
                categoryList: updatedCategoryList
            });
            // setCategoryList(updatedCategoryList);

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

    const renderColumn = (column) => (
        <div key={column} className='column'>
            {categoryList.filter(category => category.column === column).map(category => (
                <div key={category.id} style={{ marginBottom: '20px' }}>
                    <div>
                        <input
                            type="text"
                            placeholder="Category title"
                            value={category.text}
                            onChange={(e) => {
                                const newCategoryList = categoryList.map(cat =>
                                    cat.id === category.id ? { ...cat, text: e.target.value } : cat
                                );
                                setListState(selectedList.id, {
                                    categoryList: newCategoryList
                                });
                                // setCategoryList(newCategoryList)
                            }}
                        />
                        <button onClick={() => removeCategory(category.id)}>삭제</button>
                    </div>
                    {checkList.filter(item => item.categoryId === category.id).map(item => (
                        <div key={item.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <div onClick={() => toggleChecklistItemChecked(item.id)}>
                                {item.checked ? <Checkbox /> : <UnCheckbox />}
                            </div>
                            <textarea
                                id={`textarea-${item.id}`}
                                className="textarea-auto-resize"
                                value={item.text}
                                onChange={(e) => handleInputChange(item.id, e)}
                                rows={1}
                                style={{ flex: 1, marginRight: '10px', border: 'none', outline: 'none' }}
                            />
                            <button onClick={() => removeChecklistItem(item.id)}>삭제</button>
                        </div>
                    ))}
                    <div className='hover-box' onClick={() => addChecklistItem(category.id)} style={{ width: '15%', margin: '0 auto' }}>
                        <img src={plusIcon} alt='추가' style={{ width: '20px', height: '20px' }} />
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div style={{ padding: '20px', width: '100%' }}>
            <h2>{selectedList.name}</h2>
            <div style={{ display: 'flex', justifyContent: "left", marginBottom: '20px' }}>
                <div className={"hover-box"} onClick={addCategory} style={{ marginLeft: "20px", cursor: "pointer", display: "flex" }}>
                    <img src={folderPlusIcon} alt='추가' style={{ marginRight: "5px" }} /> 카테고리 추가
                </div>
            </div>
            <div className='columns'>
                {[0, 1, 2].map(renderColumn)}
            </div>
        </div>
    );
};

export default TravelChecklist;
