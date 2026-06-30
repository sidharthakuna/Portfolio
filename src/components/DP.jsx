import profilePic from "../assets/profile.jpg"

function DP({isOpen , onClose}){
    if(!isOpen) return null;

    return(
        <div className="profile-overlay" onClick={onClose}>
            <div className="profile-modal" onClick={(e)=> e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>✕</button>
                <img src={profilePic} alt="Profile" className="profile-full"></img>
            </div>
        </div>
    );
}

export default DP