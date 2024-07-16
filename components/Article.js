import { useDispatch, useSelector } from "react-redux";
import { addBookmark, removeBookmark } from "../reducers/bookmarks";
import { hideArticle, unHideArticle } from "../reducers/hiddenArticles";
import Image from "next/image";
import styles from "../styles/Article.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "antd";

function Article(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const handleBookmarkClick = () => {
    if (!user.token) {
      return;
    }

    fetch(`http://localhost:3000/users/canBookmark/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result && data.canBookmark) {
          if (props.isBookmarked) {
            dispatch(removeBookmark(props));
          } else {
            dispatch(addBookmark(props));
          }
        }
      });
  };

  const handleEyeClick = () => {
    // if (props.isHidden) {
    //   dispatch(unHideArticle(props.title));
    // } else {
    dispatch(hideArticle(props.title));
    // }
  };

  let bookmarkStyle = {};
  if (props.isBookmarked) {
    bookmarkStyle = { color: "#E9BE59" };
  }
  let eyeStyle = {};
  if (props.isHidden) {
    eyeStyle = { color: "#E9BE59" };
  }

  return (
    <div className={styles.articles}>
      <div className={styles.articleHeader}>
        <h3>{props.title}</h3>
        <Tooltip
          title={
            user.token ? "Bookmark article" : "Sign in to bookmark articles"
          }
          color="#f2b936"
          placement="top"
        >
          <FontAwesomeIcon
            icon={faBookmark}
            onClick={() => handleBookmarkClick()}
            style={bookmarkStyle}
            className={styles.bookmarkIcon}
          />
        </Tooltip>
        {/* affichage conditionnel de l'icône faEyeSlash avec la props booléenne inBookmarks */}
        {props.inBookmarks || (
          <Tooltip title="Hide article" color="#f2b936" placement="bottomLeft">
            <FontAwesomeIcon
              icon={faEyeSlash}
              onClick={() => handleEyeClick()}
              style={eyeStyle}
              className={styles.eyeIcon}
            />
          </Tooltip>
        )}
      </div>
      <h4 className={styles.articleInfos}>
        <span className={styles.source}>- {props.source.name}</span>
        <span>{props.author} -</span>
      </h4>
      <div className={styles.divider}></div>
      <Image
        src={props.urlToImage}
        alt={props.title}
        width={600}
        height={314}
      />
      <a href={props.url} target="_blank">
        <Tooltip
          title="Read the article at the source"
          color="#f2b936"
          placement="bottom"
        >
          <p className={styles.description}>{props.description}</p>
        </Tooltip>
      </a>
    </div>
  );
}

export default Article;
