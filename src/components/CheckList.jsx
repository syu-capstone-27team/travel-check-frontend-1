import React, { useState } from 'react';
import plusIcon from '../assets/plus-icon.svg';
import folderPlusIcon from '../assets/folderPlus-icon.svg';
import Checkbox from './checkboxes/Checkbox';
import UnCheckbox from './checkboxes/UnCheckbox';


const TravelChecklist = () => {
    // state 관리
    const [checkList, setCheckList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);

    const addCategory = () => {
        setCategoryList([...categoryList, { id: Date.now(), text: '' }]);
    };

    const addChecklistItem = () => {
        setCheckList([...checkList, { id: Date.now(), text: '', checked: false }]);
    };

    const updateChecklistItemText = (id, newText) => {
        setCheckList(checkList.map(item => 
            item.id === id ? { ...item, text: newText } : item
        ));
    };

    const toggleChecklistItemChecked = (id) => {
        setCheckList(checkList.map(item =>
            item.id === id ? { ...item, checked: !item.checked } : item
        ));
    };

    const removeChecklistItem = (id) => {
        setCheckList(checkList.filter(item => item.id !== id));
    };
    
    return (
        <>
            <div style={{ padding: '20px', width: "100%" }}>
                <div style={{ display: 'flex', justifyContent: "left", marginBottom: '20px' }}>
                    <div className={"hover-box"} onClick={addChecklistItem} style={{
                        left: 0,
                        cursor: "pointer",
                    }}>
                        <img src={plusIcon} style={{ marginRight: "5px" }}/>
                        <div style={{ verticalAlign: "middle" }}>체크리스트 추가</div>
                    </div>
                    <div className={"hover-box"} onClick={addCategory} style={{ marginLeft: "20px", cursor: "pointer", display: "flex" }}>
                        <img src={folderPlusIcon} style={{ marginRight: "5px" }}/> 카테고리 추가
                    </div>
                </div>
                <div>
                    {checkList.map(item => (
                        <div key={item.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', marginLeft: '5px' }}>
                            {/* <
                                type="checkbox"
                                src={item.checked ? checkedBoxIcon : uncheckedBoxIcon}
                                checked={item.checked}
                                onChange={() => toggleChecklistItemChecked(item.id)}
                                style={{ marginRight: '10px' }}
                            /> */}
                            {item.checked ? <Checkbox /> : <UnCheckbox />}

                            <input
                                type="text"
                                value={item.text}
                                onChange={(e) => updateChecklistItemText(item.id, e.target.value)}
                                style={{ flex: 1, marginRight: '10px' }}
                            />

                            <button onClick={() => removeChecklistItem(item.id)}>
                                삭제
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default TravelChecklist;
