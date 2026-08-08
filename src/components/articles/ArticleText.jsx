import "./ArticleText.scss"
import React, {useEffect, useState} from 'react'
import Article from "/src/components/articles/base/Article.jsx"
import AvatarView from "/src/components/generic/AvatarView.jsx"
import {useData} from "/src/providers/DataProvider.jsx"
import {useUtils} from "/src/hooks/utils.js"
import {useLanguage} from "/src/providers/LanguageProvider.jsx"

/**
 * @param {ArticleDataWrapper} dataWrapper
 * @param {Number} id
 * @return {JSX.Element}
 * @constructor
 */
function ArticleText({ dataWrapper, id }) {
    const [selectedItemCategoryId, setSelectedItemCategoryId] = useState(null)

    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 className={`article-text`}
                 selectedItemCategoryId={selectedItemCategoryId}
                 setSelectedItemCategoryId={setSelectedItemCategoryId}>
            <ArticleTextItems dataWrapper={dataWrapper}
                              selectedItemCategoryId={selectedItemCategoryId}/>
        </Article>
    )
}

/**
 * @param {ArticleDataWrapper} dataWrapper
 * @param {String} selectedItemCategoryId
 * @return {JSX.Element}
 * @constructor
 */
function ArticleTextItems({ dataWrapper, selectedItemCategoryId }) {
    const filteredItems = dataWrapper.getOrderedItemsFilteredBy(selectedItemCategoryId)

    return (
        <div className={`article-text-items`}>
            {filteredItems.map((itemWrapper, key) => (
                <ArticleTextItem itemWrapper={itemWrapper} 
                                      key={key}/>
            ))}
        </div>
    )
}

/**
 * @param {ArticleItemDataWrapper} itemWrapper
 * @return {JSX.Element}
 * @constructor
 */
function ArticleTextItem({ itemWrapper }) {
    const data = useData()
    const utils = useUtils()
    const language = useLanguage()
    const profile = data.getProfile()
    const resumeUrl = profile.resumePdfUrl

    const positioningClass = itemWrapper.id % 2 === 0 ?
        `article-text-item-reverse` :
        ``

    const _onDownload = () => {
        if (resumeUrl) utils.file.download(resumeUrl)
    }

    return (
        <div className={`article-text-item ${positioningClass}`}>
            <div className={`article-text-avatar-view-wrapper`}>
                <AvatarView className={`article-text-avatar-view`}
                            src={itemWrapper.img}
                            faIcon={itemWrapper.faIconWithFallback}
                            style={itemWrapper.faIconStyle}
                            alt={itemWrapper.imageAlt}/>
            </div>

            <div className={`article-text-excerpt-wrapper`}>
                <div className={`article-text-excerpt last-p-no-margin text-3`}
                     dangerouslySetInnerHTML={{__html: itemWrapper.locales.text || itemWrapper.placeholder}}/>

                {resumeUrl && (
                    <button className={`article-text-resume-btn`}
                            onClick={_onDownload}>
                        <i className={`fa-solid fa-file-arrow-down`}/>
                        <span>{language.getString("download_resume") || "Download Resume"}</span>
                    </button>
                )}
            </div>
        </div>
    )
}

export default ArticleText
