const getKindlePrettyPath = (url) => {
    const prettyPath = url.match(/\/gp\/product\/[A-Z0-9]+\//);
    return prettyPath || null;
};

const getPrettyPath = () => {
    const host = location.host;
    const url = location.href;
    let prettyPath = url.match(/\/dp\/[A-Z0-9]+\//);
    if (!prettyPath) {
        // Kindle product pages have a different path.
        prettyPath = getKindlePrettyPath(url);
    }
    return !!prettyPath ? `https://${host}${prettyPath}` : null;
};

const copyToClipboard = (text) => {
    const tmpForm = document.createElement("textarea");
    tmpForm.textContent = text;
    const bodyElm = document.getElementsByTagName('body')[0];
    bodyElm.appendChild(tmpForm);
    tmpForm.select();
    const result = document.execCommand('copy');
    bodyElm.removeChild(tmpForm);
    return result;
};

const main = () => {
    let ancestorElement = document.getElementById('tell-a-friend');
    if (!ancestorElement) {
        // Some product pages have a different class name.
        ancestorElement = document.getElementById('tell-a-friend-byline');
        if (!ancestorElement) {
            return;
        }
    }
    const prettyPath = getPrettyPath();
    if (!prettyPath) {
        return;
    }
    const onClick = () => {
        const success = copyToClipboard(prettyPath);
        if (!success) {
            alert("COPY failed!")
        }
    }
    const shareLink = document.createElement('a');
    shareLink.text = 'COPY';
    shareLink.onclick = onClick;

    const parentElement = ancestorElement.children[0];
    parentElement.append(shareLink);
};

main();
