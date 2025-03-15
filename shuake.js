// ==UserScript==
// @name         重庆高等教育智慧教育平台学习助手 || cqooc重庆高等教育智慧教育平台学习助手 || www.cqooc.com
// @namespace    http://tampermonkey.net/
// @version      3.2
// @description  1.看说明就行了。2.反对任何形式牟利，祝各位同学学有所成。3.更新了作业测验作答
// @author       Abstract
// @include      https://*.cqooc.com/*
// @grant        none
// @run-at       document-end
// @require      https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js
// @require      https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js
// @license      MIT
// ==/UserScript==
 
(function() {
    'use strict';
 
 
 
    let currentTimeout = null;
    let currentInterval = null;
    let pageInitialized = false;
    let pptTimeoutId = null;
 
    let currentPlayingVideo = null;
    let coursewareQueue = [];
    let isProcessing = false;
 
    let pptTaskId = null;
 
    let currentQueueName = null;
    let isQueueProcessing = false;
 
 
    const completionStatuses = {
        '未完成': 'data:image/png;base64,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',
        '半完成': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAbVJREFUSEu9ls8rRFEUx7/nzsjvjWQxSSTPJE1Zv0nUjEiIhRQbxQKTUiSr914pK6mJFWUjlqL8ysbCrJWVIWUh/wBF4R3d18w0zMwzi7nztu/7zuee7zn3nEdweQJGV/2H+BqCzf0gNAPwJeQvYDxC0EmZ7T26ta6ec4WhbC9aDd3HBIsZkwB73A4B0DcRdolhxK3Yy19tBqDV0AcZ2GNwtVd4EPJ3IuzvRLvPj7rqWnSshbPyCPRKwETcih2nC34BWszgPGBvgCFk0OWeOTTU1P8KqJl67oQINiAWHszraFKUAsiT28SHBBKLoRlM6+NZA7kC5BcEWzANJzNxAI7nwJ20ZSk8mzO41P4LcBiOXX5ZEwegmfo2M09JW7bG1lxrmg/ASYRo596MTZNsxXd8PnmF8JxH9jM8/0vLFyC7qxwljaRZwTm27c3etm5ER1fdOzJPi1IFFiJCmqGfMrhvfcTAQKCnsADQGWmmHmdm7SJygKbahsICiO4l4JWZq25WLlFZWlFowFtRAIotUl5k1W2q/KIpHxVFGXYJiLpxnbxdShdOEqJ0ZaZB1C399GFUiN+WH16q+w/WuLNCAAAAAElFTkSuQmCC',
        '已完成': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAfhJREFUSEu9lj1oE2EYx//PqaDYDJHaQlCoH7k4dVYuUMFFERSHQIeCUcxiih/QpXS4u9Gp9MNJwSWC4CAKKgiClgSLg4hkMIkBISFrhwhKPu4p7zWXz7vLXWjMmPd5/r/3+XyP4PKbVS+e+Cc1rsPgqyCcARBqmVfAKEKit4eNg69/6J/KTjJkdxBRlRATdGbcAviA2yUAahLhGTHUnJ6p9NsOACKqco2BFIMD7sK9pwSqErCQ0zNvuk96AGEteg8wVsGQ/Ii3bQkGID0saOl16782QNzcIH41snhH0ZCYbliRmAAz58BPv2lxLqyZrnOiJiZA1pQnzHxnpLQ4OBHR07yWSZBoxb+o/x7eLX7x1DyCQzMk69EkG8amX3cv9iRJiySryjsGX/Hi0G8zHZhEeOo00sWvtu4Eek+ypuSYWfYLOHv8FFLxDRw7GsSltRhKOwMzBiLKC0CVmSf8ALrFPxe+IPF8yT4Coj+ugNsX5vGtlMX3crYt0C9+98Uy6s26K8A2RSeDIXy8/xK1Rg1CZOvXNvyIC+JeilyKvHL5AW6ej5mQRx8eIzkXN3Mu0uJ2885QiyIPaVMLYjl5FTcjEG3qZdAsiB9xscbNQfO6KkRN7FrRcR9Zq+K/LLsWZHzr2gpzrA+OBRnrk9kFGd+j390V+/HZsgvSIhcecicecAAAAABJRU5ErkJggg=='
    };
 
    const MAIN_PAGE_HOST = 'www.cqooc.com';
    const IFRAME_PAGE_HOST = 'preview.cqooc.com';
 
    let isProcessingQueue = false;
 
    let coursewareQueues = {
        '默认未完成队列': {
            items: [],
            interval: 240000
        }
    };
 
 
    const categoryKeywords = {
        '测验': ['测验', '测试'],
        '课件': ['课件', '小节', '视频'],
        '作业': ['作业'],
        '讨论': ['讨论', '答疑'],
        '考试': ['考试', '期末测试', '补考'],
        '其他': []
    };
 
  
    let processedItems = new Set();
 
 
    function simulateClick(element) {
        if (!element) return;
        const event = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
        });
        element.dispatchEvent(event);
    }
 
  
    async function expandAllParentsAsync(element) {
        const parents = [];
        let parent = element.parentElement;
 
        while (parent && parent !== document.body) {
            if (parent.classList.contains('second-level-inner-box') || parent.classList.contains('first-level-inner-box')) {
                parents.push(parent);
            }
            parent = parent.parentElement;
        }
 
        parents.reverse();
 
        for (const parent of parents) {
            const toggleButton = parent.previousElementSibling && parent.previousElementSibling.querySelector('.right-icon > i.anticon-down');
            if (toggleButton) {
                const innerBox = parent;
                const height = window.getComputedStyle(innerBox).height;
                if (height === '0px') {
                    simulateClick(toggleButton);
                    await new Promise(resolve => setTimeout(resolve, 500));
                }
            }
        }
    }
 
    function waitForElement(selector, timeout) {
        return new Promise(resolve => {
            const startTime = Date.now();
 
            const interval = setInterval(() => {
                const element = document.querySelector(selector);
                if (element) {
                    clearInterval(interval);
                    resolve(element);
                } else if (Date.now() - startTime > timeout) {
                    clearInterval(interval);
                    resolve(null);
                }
            }, 100);
        });
    }
 
    async function jumpToContentItem(originalElement) {
        return new Promise(async (resolve, reject) => {
            try {
                let targetElement = originalElement;
                if (!document.body.contains(originalElement)) {
                    const title = originalElement.querySelector('p.title')?.textContent.trim();
                    if (title) {
                        targetElement = Array.from(document.querySelectorAll('.third-level-inner-box'))
                            .find(el => el.querySelector('p.title')?.textContent.trim() === title);
                    }
                    if (!targetElement) {
                        throw new Error('找不到目标元素');
                    }
                }
 
                await expandAllParentsAsync(targetElement);
                const clickable = targetElement.querySelector('a') ||
                      targetElement.querySelector('p.title') ||
                      targetElement;
                if (!clickable) {
                    throw new Error('未找到可点击的元素');
                }
 
                clickable.scrollIntoView({ behavior: 'smooth', block: 'center' });
                setTimeout(() => {
                    simulateClick(clickable);
                    resolve();
                }, 500);
 
            } catch (error) {
                console.error('跳转失败：', error);
                reject(error);
            }
        });
    }
 
 
    async function performBatchAutoReply(data, progressLabel) {
        let repliedCount = 0;
        for (const item of data.items) {
            try {
                await performAutoReply(item);
                repliedCount++;
                updateReplyProgress(data, progressLabel, repliedCount);
            } catch (error) {
                console.error('一键回复失败:', error);
            }
        }
    }
 
 
    async function performAutoReply(itemData) {
        try {
            await jumpToContentItem(itemData.originalElement);
            const discussionArea = await waitForElement('.course-courseQaDiscussion-qa', 5000);
            if (!discussionArea) return;
 
            const replyButton = discussionArea.querySelector('.conv-option .reply');
            if (!replyButton) return;
 
            replyButton.click();
 
            const replyInput = await waitForElement('.course-courseQaDiscussion-reply textarea.ant-input', 2000);
            const submitButton = await waitForElement('.course-courseQaDiscussion-reply .ant-btn-primary', 2000);
            const firstReply = discussionArea.querySelector('.conv-subtitle');
 
            if (replyInput && submitButton && firstReply) {
                replyInput.value = firstReply.textContent.trim();
                replyInput.dispatchEvent(new Event('input', { bubbles: true }));
                submitButton.click();
 
 
                itemData.replyStatus = '已回复';
                itemData.replyStatusElement.textContent = '已回复';
                itemData.replyStatusElement.style.color = 'green';
 
                console.log('自动回复完成');
            }
        } catch (error) {
            console.error('自动回复失败:', error);
        }
    }
 
    function updateReplyProgress(data, progressLabel, repliedCount = null) {
        if (repliedCount === null) {
            repliedCount = data.items.filter(item => item.replyStatus === '已回复').length;
        }
        progressLabel.textContent = `已回复：${repliedCount}/${data.items.length}`;
    }
 
    async function collectTestAttempts(data, progressLabel) {
        let processedCount = 0;
        for (const itemData of data.items) {
            try {
                await jumpToContentItem(itemData.originalElement);
                const attemptInfo = await getTestAttemptInfo();
                const timeInfo = await getTestTimeInfo();
 
                updateTestItemWithAttemptInfo(itemData, attemptInfo, timeInfo);
 
                processedCount++;
                progressLabel.textContent = `已获取：${processedCount}/${data.items.length}`;
                await new Promise(resolve => setTimeout(resolve, 500));
 
            } catch (error) {
                console.error('获取测验信息失败:', error);
            }
        }
    }
 
    async function getTestAttemptInfo() {
        return new Promise((resolve, reject) => {
            const timeout = 3000;
            const startTime = Date.now();
 
            const interval = setInterval(() => {
                const attemptElements = document.querySelectorAll('.list-content-text p');
                for (const p of attemptElements) {
                    if (p.textContent.includes('已作答/可作答次数')) {
                        const span = p.querySelector('span');
                        if (span) {
                            clearInterval(interval);
                            resolve(span.textContent.trim());
                            return;
                        }
                    }
                }
 
                if (Date.now() - startTime > timeout) {
                    clearInterval(interval);
                    reject('获取作答信息超时');
                }
            }, 100);
        });
    }
 
    async function getTestTimeInfo() {
        return new Promise((resolve, reject) => {
            const timeout = 3000;
            const startTime = Date.now();
 
            const interval = setInterval(() => {
                const timeElements = document.querySelectorAll('.list-content-text p');
                for (const p of timeElements) {
                    if (p.textContent.includes('开始至截止时间：')) {
                        const span = p.querySelector('span');
                        if (span) {
                            clearInterval(interval);
                            resolve(span.textContent.trim());
                            return;
                        }
                    }
                }
 
                if (Date.now() - startTime > timeout) {
                    clearInterval(interval);
                    reject('获取开始至截止时间超时');
                }
            }, 100);
        });
    }
 
    function updateTestItemWithAttemptInfo(itemData, attemptInfo, timeInfo) {
        if (itemData.taskNameElement) {
            const infoContainer = document.createElement('div');
            infoContainer.style.display = 'flex';
            infoContainer.style.flexDirection = 'column';
            infoContainer.style.marginLeft = '10px';
 
            const attemptLabel = document.createElement('span');
            attemptLabel.textContent = `作答信息：${attemptInfo}`;
            attemptLabel.style.color = 'blue';
            infoContainer.appendChild(attemptLabel);
 
            const timeLabel = document.createElement('span');
            timeLabel.textContent = `时间：${timeInfo}`;
            timeLabel.style.color = 'green';
            infoContainer.appendChild(timeLabel);
 
            itemData.taskNameElement.parentElement.appendChild(infoContainer);
        }
    }
 
    async function collectAssignmentInfo(data, progressLabel) {
        let processedCount = 0;
        for (const itemData of data.items) {
            try {
                await jumpToContentItem(itemData.originalElement);
                const attemptInfo = await getAssignmentAttemptInfo();
                const timeInfo = await getAssignmentTimeInfo();
 
                updateAssignmentItemWithInfo(itemData, attemptInfo, timeInfo);
 
                processedCount++;
                progressLabel.textContent = `已获取：${processedCount}/${data.items.length}`;
                await new Promise(resolve => setTimeout(resolve, 100));
            } catch (error) {
                console.error('获取作业信息失败:', error);
            }
        }
    }
 
async function getAssignmentAttemptInfo() {
    return new Promise((resolve, reject) => {
        const timeout = 3000;
        const startTime = Date.now();
 
        const interval = setInterval(() => {
            const attemptElement = Array.from(document.querySelectorAll('.list-content-text p'))
                .find(p => p.textContent.includes('已作答/可作答次数'))
                ?.querySelector('span');
 
            if (attemptElement) {
                clearInterval(interval);
                resolve(attemptElement.textContent.trim());
                return;
            }
 
            if (Date.now() - startTime > timeout) {
                clearInterval(interval);
                reject('获取作答次数超时');
            }
        }, 100);
    });
}
 
 
    async function getAssignmentTimeInfo() {
        return new Promise((resolve, reject) => {
            const timeout = 3000;
            const startTime = Date.now();
 
            const interval = setInterval(() => {
                const timeElement = Array.from(document.querySelectorAll('.list-content-text p'))
                .find(p => p.textContent.includes('开始至截止时间：'))?.querySelector('span');
 
                if (timeElement) {
                    clearInterval(interval);
                    resolve(timeElement.textContent.trim());
                }
 
                if (Date.now() - startTime > timeout) {
                    clearInterval(interval);
                    reject('获取开始至截止时间超时');
                }
            }, 100);
        });
    }
 
    function updateAssignmentItemWithInfo(itemData, attemptInfo, timeInfo) {
        if (itemData.taskNameElement) {
            const infoContainer = document.createElement('div');
            infoContainer.style.display = 'flex';
            infoContainer.style.flexDirection = 'column';
            infoContainer.style.marginLeft = '10px';
 
            const attemptLabel = document.createElement('span');
            attemptLabel.textContent = `作答信息：${attemptInfo}`;
            attemptLabel.style.color = 'blue';
            infoContainer.appendChild(attemptLabel);
 
            const timeLabel = document.createElement('span');
            timeLabel.textContent = `时间：${timeInfo}`;
            timeLabel.style.color = 'green';
            infoContainer.appendChild(timeLabel);
 
            itemData.taskNameElement.parentElement.appendChild(infoContainer);
        }
    }
 
 
    function isVideoCompleted(coursewareElement) {
        let video = coursewareElement.querySelector('#dplayer video') || coursewareElement.querySelector('video');
        if (video) {
            const progress = (video.currentTime / video.duration) * 100;
            return progress >= 100;
        }
        return false;
    }
 
    function isPptCompleted(coursewareElement) {
        if (!coursewareElement) return false;
        if (coursewareElement.dataset.pptCompleted === 'true') return true;
 
        const completeIcon = coursewareElement.querySelector('img.file-complete');
        if (completeIcon) {
            const src = completeIcon.getAttribute('src');
            return src.includes(completionStatuses['已完成']);
        }
        return false;
    }
 
 
    function categorizeItems(items) {
        const categories = {};
 
        items.forEach(item => {
            if (processedItems.has(item)) return;
 
            const titleElement = item.querySelector('p.title, p.title-big');
            if (!titleElement) return;
            const titleText = titleElement.textContent.trim();
 
            let matchedCategory = '其他';
            for (const [category, keywords] of Object.entries(categoryKeywords)) {
                if (keywords.some(keyword => titleText.includes(keyword))) {
                    matchedCategory = category;
                    break;
                }
            }
 
            const itemData = {
                element: item.cloneNode(true),
                originalElement: item,
                title: titleText,
                replyStatus: '未回复'
            };
 
            if (matchedCategory === '课件') {
                let status = '未完成';
                const img = item.querySelector('img.file-complete');
                if (img) {
                    const src = img.getAttribute('src');
                    if (src === completionStatuses['已完成']) {
                        status = '已完成';
                    } else if (src === completionStatuses['半完成']) {
                        status = '半完成';
                    } else if (src === completionStatuses['未完成']) {
                        status = '未完成';
                    } else {
                        // 如果无法匹配到已知的图标，默认未完成
                        status = '未完成';
                    }
                }
 
 
                itemData.status = status;
 
 
                if (status === '未完成' || status === '半完成') {
                    coursewareQueues['默认未完成队列'].items.push(itemData);
                }
            }
 
            if (!categories[matchedCategory]) {
                categories[matchedCategory] = { items: [], completed: 0, halfCompleted: 0, total: 0 };
            }
 
            categories[matchedCategory].items.push(itemData);
            if (matchedCategory === '课件') {
                categories[matchedCategory].total += 1;
                if (itemData.status === '已完成') {
                    categories[matchedCategory].completed += 1;
                } else if (itemData.status === '半完成') {
                    categories[matchedCategory].halfCompleted += 1;
                }
            }
 
            processedItems.add(item);
        });
 
        return categories;
    }
 
    async function waitForContentLoaded(maxRetries = 40, intervalTime = 500) {
        return new Promise((resolve) => {
            let retries = 0;
            const interval = setInterval(() => {
                const items = document.querySelectorAll('.third-level-inner-box');
                if (items.length > 0 || retries >= maxRetries) {
                    clearInterval(interval);
                    resolve();
                }
                retries++;
            }, intervalTime);
        });
    }
 
    function createDisplayPanel() {
        if (document.getElementById('custom-display-container')) return document.getElementById('custom-display-container').querySelector('.panel-content');
 
        const displayContainer = document.createElement('div');
        displayContainer.id = 'custom-display-container';
        displayContainer.style.position = 'fixed';
        displayContainer.style.top = '10%';
        displayContainer.style.left = '10%';
        displayContainer.style.width = '500px';
        displayContainer.style.height = '600px';
        displayContainer.style.overflow = 'auto';
        displayContainer.style.backgroundColor = '#fff';
        displayContainer.style.border = '1px solid #ccc';
        displayContainer.style.borderRadius = '8px';
        displayContainer.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
        displayContainer.style.zIndex = '10000';
        displayContainer.style.display = 'block';
 
        const panelHeader = document.createElement('div');
        panelHeader.className = 'panel-header';
        panelHeader.style.backgroundColor = '#007bff';
        panelHeader.style.color = '#fff';
        panelHeader.style.padding = '10px';
        panelHeader.style.cursor = 'move';
        panelHeader.style.fontSize = '16px';
        panelHeader.style.fontWeight = 'bold';
        panelHeader.style.position = 'relative';
        panelHeader.textContent = '反馈群：1006332809  || Written by Abstract😉';
 
        const minimizeButton = document.createElement('button');
        minimizeButton.textContent = '—';
        minimizeButton.title = '最小化';
        minimizeButton.style.position = 'absolute';
        minimizeButton.style.top = '5px';
        minimizeButton.style.right = '10px';
        minimizeButton.style.background = 'transparent';
        minimizeButton.style.border = 'none';
        minimizeButton.style.color = '#fff';
        minimizeButton.style.fontSize = '18px';
        minimizeButton.style.cursor = 'pointer';
 
        minimizeButton.addEventListener('click', () => {
            displayContainer.style.display = 'none';
            restoreButton.style.display = 'block';
        });
 
        panelHeader.appendChild(minimizeButton);
 
        const panelContent = document.createElement('div');
        panelContent.className = 'panel-content';
        panelContent.style.padding = '10px';
 
 
        const instructionsDiv = document.createElement('div');
        instructionsDiv.style.marginBottom = '10px';
        instructionsDiv.style.padding = '10px';
        instructionsDiv.style.border = '1px solid #eee';
        instructionsDiv.style.borderRadius = '5px';
        instructionsDiv.style.backgroundColor = '#f9f9f9';
        instructionsDiv.innerHTML = `
            <strong><b>说明：***---  注意课件切换时间是固定的哦 ---***</b></strong><br>
            1. 页面需保持可见，不可最小化(意思是窗口可最小，但是页面不能缩没)<br>
            2. 使用定时切换和自定义任务队列对抗干扰因素&提高灵活性，比如说，最下面你可以设置课件切换间隔为1min创建队列，然后把所有ppt课件添加进去，也可以开3倍速设置个6分钟创建队列（具体看这个时长能不能覆盖完所有的视频，一般18分钟够了），把视频课件添加进去。<br>
            2. 视频倍速默认3x，可在面板中调整<br>
            3. 课件切换默认4分钟，可调整<br>
            4. 自动化回复取的是评论区第一条，一键回复速度比较快，存在漏回复情况，建议单个回复<br>
            5. 一键自动刷课从默认未完成队列开始(即4分钟切换的那个)<br>
            6. <b>推荐自定义队列使用，先创建队列（设置课件切换时间和名称），然后添加需要执行的课件（选中课件标题后面的白色框框），然后再划到最下面选中目标队列然后添加进去最后执行就行了</b>
        `;
        panelContent.appendChild(instructionsDiv);
 
 
        const speedSelectorContainer = document.createElement('div');
        speedSelectorContainer.style.marginTop = '15px';
 
        const speedLabel = document.createElement('label');
        speedLabel.textContent = '视频倍速: ';
        speedLabel.style.marginRight = '10px';
        speedLabel.style.fontWeight = 'bold';
 
        const speedSelector = document.createElement('select');
        speedSelector.style.padding = '5px';
        speedSelector.style.borderRadius = '3px';
        speedSelector.style.border = '1px solid #ccc';
 
        const speeds = [1, 2, 3];
        const storedSpeed = parseFloat(localStorage.getItem('videoPlaybackSpeed')) || 3;
        speeds.forEach(speed => {
            const option = document.createElement('option');
            option.value = speed;
            option.textContent = `${speed}x`;
            if (speed === storedSpeed) option.selected = true;
            speedSelector.appendChild(option);
        });
 
        speedSelector.addEventListener('change', () => {
            const selectedSpeed = parseFloat(speedSelector.value);
            localStorage.setItem('videoPlaybackSpeed', selectedSpeed);
 
           
            if (window.videoController && window.videoController.activeVideos) {
                window.videoController.activeVideos.forEach(task => {
                    if (task.video) {
                        task.video.playbackRate = selectedSpeed;
                    }
                });
            }
        });
 
 
        speedSelectorContainer.appendChild(speedLabel);
        speedSelectorContainer.appendChild(speedSelector);
        panelContent.appendChild(speedSelectorContainer);
 
 
        const intervalContainer = document.createElement('div');
        intervalContainer.style.marginTop = '15px';
 
        const intervalLabel = document.createElement('label');
        intervalLabel.textContent = '课件切换的间隔时间(秒): ';
        intervalLabel.style.marginRight = '10px';
        intervalLabel.style.fontWeight = 'bold';
 
        const intervalInput = document.createElement('input');
        intervalInput.type = 'number';
        intervalInput.style.width = '60px';
        intervalInput.value = (coursewareQueues['默认未完成队列'].interval / 1000).toString();
        intervalInput.style.padding = '5px';
        intervalInput.style.borderRadius = '3px';
        intervalInput.style.border = '1px solid #ccc';
 
        intervalInput.addEventListener('change', () => {
            let val = parseInt(intervalInput.value);
            if (isNaN(val) || val <= 0) {
                val = 240;
            }
            coursewareQueues['默认未完成队列'].interval = val * 1000;
            localStorage.setItem('autoInterval', coursewareQueues['默认未完成队列'].interval);
        });
 
        intervalContainer.appendChild(intervalLabel);
        intervalContainer.appendChild(intervalInput);
        panelContent.appendChild(intervalContainer);
 
 
        const restoreButton = document.createElement('button');
        restoreButton.id = 'restore-button';
        restoreButton.textContent = 'Be yourself and Dream bigger😉';
        restoreButton.style.position = 'fixed';
        restoreButton.style.bottom = '20px';
        restoreButton.style.left = '20px';
        restoreButton.style.zIndex = '10001';
        restoreButton.style.padding = '10px 20px';
        restoreButton.style.backgroundColor = '#007bff';
        restoreButton.style.color = '#fff';
        restoreButton.style.border = 'none';
        restoreButton.style.borderRadius = '5px';
        restoreButton.style.cursor = 'pointer';
        restoreButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        restoreButton.style.display = 'none';
 
        restoreButton.addEventListener('click', () => {
            displayContainer.style.display = 'block';
            restoreButton.style.display = 'none';
        });
 
        document.body.appendChild(restoreButton);
 
        displayContainer.appendChild(panelHeader);
        displayContainer.appendChild(panelContent);
        document.body.appendChild(displayContainer);
 
        makeElementDraggable(displayContainer);
 
        return panelContent;
    }
 
    function makeElementDraggable(elmnt) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        const header = elmnt.querySelector(".panel-header");
        if (header) {
            header.style.cursor = 'move';
            header.onmousedown = dragMouseDown;
        }
 
        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }
 
        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            let newTop = elmnt.offsetTop - pos2;
            let newLeft = elmnt.offsetLeft - pos1;
 
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const elemWidth = elmnt.offsetWidth;
            const elemHeight = elmnt.offsetHeight;
 
            if (newTop < 0) newTop = 0;
            if (newLeft < 0) newLeft = 0;
            if (newTop + elemHeight > windowHeight) newTop = windowHeight - elemHeight;
            if (newLeft + elemWidth > windowWidth) newLeft = windowWidth - elemWidth;
 
            elmnt.style.top = newTop + "px";
            elmnt.style.left = newLeft + "px";
        }
 
        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
 
    function populatePanel(panelContent, categories) {
 
        const autoButton = document.createElement('button');
        autoButton.textContent = '一键自动刷课(默认未完成队列)';
        autoButton.style.width = '100%';
        autoButton.style.padding = '10px';
        autoButton.style.marginBottom = '15px';
        autoButton.style.backgroundColor = '#28a745';
        autoButton.style.color = '#fff';
        autoButton.style.border = 'none';
        autoButton.style.borderRadius = '5px';
        autoButton.style.cursor = 'pointer';
        autoButton.style.fontSize = '16px';
        autoButton.style.zIndex = '10001';
 
        autoButton.addEventListener('click', async () => {
            if (isQueueProcessing) {
                alert('已有队列在执行，请稍后。');
                return;
            }
            currentQueueName = '默认未完成队列';
            await startQueueProcessing(currentQueueName);
        });
 
        panelContent.appendChild(autoButton);
 
 
        if (categories['讨论'] && categories['讨论'].items.length > 0) {
            const data = categories['讨论'];
            const progressLabel = document.createElement('span');
            progressLabel.textContent = `已回复：0/${data.items.length}`;
            progressLabel.style.fontSize = '14px';
 
            const replyAllButton = document.createElement('button');
            replyAllButton.textContent = '讨论区一键自动回复';
            replyAllButton.style.width = '100%';
            replyAllButton.style.padding = '10px';
            replyAllButton.style.marginBottom = '5px';
            replyAllButton.style.backgroundColor = '#4caf50';
            replyAllButton.style.color = '#fff';
            replyAllButton.style.border = 'none';
            replyAllButton.style.borderRadius = '5px';
            replyAllButton.style.cursor = 'pointer';
            replyAllButton.style.fontSize = '14px';
 
            replyAllButton.addEventListener('click', async () => {
                await performBatchAutoReply(data, progressLabel);
            });
 
            panelContent.appendChild(replyAllButton);
            panelContent.appendChild(progressLabel);
        }
 
 
        if (categories['测验'] && categories['测验'].items.length > 0) {
            const data = categories['测验'];
            const testProgress = document.createElement('span');
            testProgress.textContent = `已获取：0/${data.items.length}`;
            testProgress.style.fontSize = '14px';
 
            const getInfoButton = document.createElement('button');
            getInfoButton.textContent = '获取测验作答信息';
            getInfoButton.style.width = '100%';
            getInfoButton.style.padding = '10px';
            getInfoButton.style.marginBottom = '5px';
            getInfoButton.style.backgroundColor = '#17a2b8';
            getInfoButton.style.color = '#fff';
            getInfoButton.style.border = 'none';
            getInfoButton.style.borderRadius = '5px';
            getInfoButton.style.cursor = 'pointer';
            getInfoButton.style.fontSize = '14px';
 
            getInfoButton.addEventListener('click', () => {
                collectTestAttempts(data, testProgress);
            });
 
            panelContent.appendChild(getInfoButton);
            panelContent.appendChild(testProgress);
        }
 
 
        if (categories['作业'] && categories['作业'].items.length > 0) {
            const data = categories['作业'];
            const assignmentProgress = document.createElement('span');
            assignmentProgress.textContent = `已获取：0/${data.items.length}`;
            assignmentProgress.style.fontSize = '14px';
 
            const getAssignmentButton = document.createElement('button');
            getAssignmentButton.textContent = '获取作业信息';
            getAssignmentButton.style.width = '100%';
            getAssignmentButton.style.padding = '10px';
            getAssignmentButton.style.marginBottom = '5px';
            getAssignmentButton.style.backgroundColor = '#ffc107';
            getAssignmentButton.style.color = '#fff';
            getAssignmentButton.style.border = 'none';
            getAssignmentButton.style.borderRadius = '5px';
            getAssignmentButton.style.cursor = 'pointer';
            getAssignmentButton.style.fontSize = '14px';
 
            getAssignmentButton.addEventListener('click', () => {
                collectAssignmentInfo(data, assignmentProgress);
            });
 
            panelContent.appendChild(getAssignmentButton);
            panelContent.appendChild(assignmentProgress);
        }
 
 
        for (const [categoryName, data] of Object.entries(categories)) {
            const categoryPanel = document.createElement('div');
            categoryPanel.className = 'category-panel';
            categoryPanel.style.border = '1px solid #ccc';
            categoryPanel.style.margin = '10px 0';
            categoryPanel.style.borderRadius = '5px';
            categoryPanel.style.overflow = 'hidden';
 
            const headerContainer = document.createElement('div');
            headerContainer.style.display = 'flex';
            headerContainer.style.justifyContent = 'space-between';
            headerContainer.style.alignItems = 'center';
            headerContainer.style.background = '#f0f0f0';
            headerContainer.style.padding = '10px';
            headerContainer.style.cursor = 'pointer';
            headerContainer.style.fontWeight = 'bold';
            headerContainer.style.fontSize = '14px';
 
            const header = document.createElement('div');
            if (categoryName === '课件') {
                const progress = `${data.completed}/${data.total}`;
                const halfProgress = data.halfCompleted;
                header.textContent = `课件 (已完成: ${progress}, 半完成: ${halfProgress})`;
            } else {
                header.textContent = `${categoryName} (${data.items.length})`;
            }
            headerContainer.appendChild(header);
 
            const content = document.createElement('div');
            content.className = 'category-content';
            content.style.display = 'none';
            content.style.padding = '10px';
 
            data.items.forEach(itemData => {
                const taskItem = document.createElement('div');
                taskItem.className = 'task-item';
                taskItem.style.marginBottom = '5px';
                taskItem.style.display = 'flex';
                taskItem.style.alignItems = 'center';
                taskItem.style.justifyContent = 'space-between';
 
                const leftContent = document.createElement('div');
                leftContent.style.display = 'flex';
                leftContent.style.alignItems = 'center';
                leftContent.style.flex = '1';
 
 
                if (categoryName === '课件') {
                    const statusIcon = document.createElement('img');
                    statusIcon.style.width = '16px';
                    statusIcon.style.height = '16px';
                    statusIcon.style.marginRight = '10px';
                    statusIcon.src = completionStatuses[itemData.status || '未完成'];
                    leftContent.appendChild(statusIcon);
                }
 
                const taskName = document.createElement('span');
                taskName.textContent = itemData.title;
                leftContent.appendChild(taskName);
 
                itemData.taskNameElement = taskName;
 
 
                if (categoryName === '讨论') {
                    const statusLabel = document.createElement('span');
                    statusLabel.textContent = '未回复';
                    statusLabel.style.marginLeft = '10px';
                    statusLabel.style.color = 'red';
                    statusLabel.className = 'reply-status';
                    itemData.replyStatusElement = statusLabel;
                    leftContent.appendChild(statusLabel);
                }
 
                const buttonsContainer = document.createElement('div');
                buttonsContainer.style.display = 'flex';
                buttonsContainer.style.gap = '5px';
 
 
                const itemJumpButton = document.createElement('button');
                itemJumpButton.textContent = '跳转';
                itemJumpButton.style.padding = '2px 8px';
                itemJumpButton.style.fontSize = '12px';
                itemJumpButton.style.cursor = 'pointer';
                itemJumpButton.style.backgroundColor = '#007bff';
                itemJumpButton.style.color = '#fff';
                itemJumpButton.style.border = 'none';
                itemJumpButton.style.borderRadius = '3px';
 
                itemJumpButton.addEventListener('click', async (e) => {
                    e.stopPropagation();
                    await jumpToContentItem(itemData.originalElement);
                });
                buttonsContainer.appendChild(itemJumpButton);
 
 
                if (categoryName === '讨论') {
                    const itemReplyButton = document.createElement('button');
                    itemReplyButton.textContent = '自动回复';
                    itemReplyButton.style.padding = '2px 8px';
                    itemReplyButton.style.fontSize = '12px';
                    itemReplyButton.style.cursor = 'pointer';
                    itemReplyButton.style.backgroundColor = '#4caf50';
                    itemReplyButton.style.color = '#fff';
                    itemReplyButton.style.border = 'none';
                    itemReplyButton.style.borderRadius = '3px';
 
                    itemReplyButton.addEventListener('click', async (e) => {
                        e.stopPropagation();
                        await performAutoReply(itemData);
                    });
                    buttonsContainer.appendChild(itemReplyButton);
                }
 
 
                if (categoryName === '课件') {
                    const queueCheckbox = document.createElement('input');
                    queueCheckbox.type = 'checkbox';
                    queueCheckbox.title = '选择本课件加入自定义队列';
                    itemData.queueCheckbox = queueCheckbox;
                    buttonsContainer.appendChild(queueCheckbox);
                }
 
                taskItem.appendChild(leftContent);
                taskItem.appendChild(buttonsContainer);
                content.appendChild(taskItem);
            });
 
            headerContainer.addEventListener('click', () => {
                content.style.display = content.style.display === 'none' ? 'block' : 'none';
            });
 
            categoryPanel.appendChild(headerContainer);
            categoryPanel.appendChild(content);
 
            panelContent.appendChild(categoryPanel);
        }
    }
 
    function createQueueUI(panelContent, categories) {
        const queueContainer = document.createElement('div');
        queueContainer.style.marginTop = '20px';
        queueContainer.style.borderTop = '1px solid #ddd';
        queueContainer.style.paddingTop = '10px';
 
        const queueTitle = document.createElement('div');
        queueTitle.textContent = '自定义队列管理(仅课件)';
        queueTitle.style.fontWeight = 'bold';
        queueTitle.style.marginBottom = '10px';
        queueContainer.appendChild(queueTitle);
 
        const queueList = document.createElement('div');
        queueList.id = 'queue-list';
        queueContainer.appendChild(queueList);
 
        function renderQueueList() {
            queueList.innerHTML = '';
            for (const [qName, qData] of Object.entries(coursewareQueues)) {
                const qDiv = document.createElement('div');
                qDiv.style.marginBottom = '5px';
                qDiv.style.display = 'flex';
                qDiv.style.alignItems = 'center';
                qDiv.style.justifyContent = 'space-between';
 
                const qInfo = document.createElement('span');
                qInfo.textContent = `${qName} (任务数: ${qData.items.length}, 间隔: ${qData.interval/1000}s)`;
                qDiv.appendChild(qInfo);
 
                const runBtn = document.createElement('button');
                runBtn.textContent = '运行队列';
                runBtn.style.fontSize = '12px';
                runBtn.style.padding = '2px 5px';
                runBtn.style.cursor = 'pointer';
                runBtn.style.backgroundColor = '#28a745';
                runBtn.style.color = '#fff';
                runBtn.style.border = 'none';
                runBtn.style.borderRadius = '3px';
                runBtn.addEventListener('click', async () => {
                    if (isQueueProcessing) {
                        alert('已有队列在执行，请稍后。');
                        return;
                    }
                    currentQueueName = qName;
                    await startQueueProcessing(qName);
                });
                qDiv.appendChild(runBtn);
 
                if (qName !== '默认未完成队列') {
                    const deleteBtn = document.createElement('button');
                    deleteBtn.textContent = '删除队列';
                    deleteBtn.style.fontSize = '12px';
                    deleteBtn.style.padding = '2px 5px';
                    deleteBtn.style.cursor = 'pointer';
                    deleteBtn.style.backgroundColor = '#dc3545';
                    deleteBtn.style.color = '#fff';
                    deleteBtn.style.border = 'none';
                    deleteBtn.style.borderRadius = '3px';
                    deleteBtn.addEventListener('click', () => {
                        delete coursewareQueues[qName];
                        renderQueueList();
                    });
                    qDiv.appendChild(deleteBtn);
                }
 
                queueList.appendChild(qDiv);
            }
        }
 
        renderQueueList();
 
        const createQueueForm = document.createElement('div');
        createQueueForm.style.marginTop = '10px';
 
        const queueNameInput = document.createElement('input');
        queueNameInput.type = 'text';
        queueNameInput.placeholder = '输入新队列名称';
        queueNameInput.style.marginRight = '10px';
        queueNameInput.style.padding = '5px';
 
        const queueIntervalInput = document.createElement('input');
        queueIntervalInput.type = 'number';
        queueIntervalInput.placeholder = '间隔(秒)';
        queueIntervalInput.value = 240;
        queueIntervalInput.style.marginRight = '10px';
        queueIntervalInput.style.padding = '5px';
        queueIntervalInput.style.width = '60px';
 
        const createBtn = document.createElement('button');
        createBtn.textContent = '创建队列';
        createBtn.style.padding = '5px 10px';
        createBtn.style.backgroundColor = '#007bff';
        createBtn.style.color = '#fff';
        createBtn.style.border = 'none';
        createBtn.style.borderRadius = '3px';
        createBtn.style.cursor = 'pointer';
 
        createBtn.addEventListener('click', () => {
            const qName = queueNameInput.value.trim();
            const qInterval = parseInt(queueIntervalInput.value) * 1000;
 
            if (!qName) {
                alert('请填写队列名称');
                return;
            }
 
            if (isNaN(qInterval) || qInterval <= 0) {
                alert('间隔时间无效');
                return;
            }
 
            if (coursewareQueues[qName]) {
                alert('该队列名称已存在，请换一个。');
                return;
            }
 
            coursewareQueues[qName] = {
                items: [],
                interval: qInterval
            };
 
            queueNameInput.value = '';
            queueIntervalInput.value = '240';
            renderQueueList();
            refreshQueueSelect();
        });
 
        createQueueForm.appendChild(queueNameInput);
        createQueueForm.appendChild(queueIntervalInput);
        createQueueForm.appendChild(createBtn);
 
        const addToQueueContainer = document.createElement('div');
        addToQueueContainer.style.marginTop = '10px';
 
        const queueSelect = document.createElement('select');
        function refreshQueueSelect() {
            const selected = queueSelect.value;
            queueSelect.innerHTML = '';
            Object.keys(coursewareQueues).forEach(qName => {
                const opt = document.createElement('option');
                opt.value = qName;
                opt.textContent = qName;
                queueSelect.appendChild(opt);
            });
            if (coursewareQueues[selected]) {
                queueSelect.value = selected;
            }
        }
 
        refreshQueueSelect();
        queueSelect.style.marginRight = '10px';
        queueSelect.style.padding = '5px';
 
        const addSelectedBtn = document.createElement('button');
        addSelectedBtn.textContent = '添加选中课件到队列';
        addSelectedBtn.style.padding = '5px 10px';
        addSelectedBtn.style.backgroundColor = '#28a745';
        addSelectedBtn.style.color = '#fff';
        addSelectedBtn.style.border = 'none';
        addSelectedBtn.style.borderRadius = '3px';
        addSelectedBtn.style.cursor = 'pointer';
 
        addSelectedBtn.addEventListener('click', () => {
            const selectedQueue = queueSelect.value;
            const allCheckboxes = document.querySelectorAll('.category-panel .task-item input[type="checkbox"]');
            allCheckboxes.forEach(chk => {
                if (chk.checked) {
                    const listItem = chk.closest('.task-item');
                    const titleSpan = listItem.querySelector('span');
                    const titleText = titleSpan ? titleSpan.textContent.trim() : '';
                    for (const cat of Object.values(categories)) {
                        if (!cat.items) continue;
                        const it = cat.items.find(d => d.title === titleText);
                        if (it) {
                            // 确保是课件才加入队列
                            const catName = Object.entries(categories).find(([k,v])=>v.items.includes(it))?.[0]||'';
                            if (catName === '课件' && !coursewareQueues[selectedQueue].items.includes(it)) {
                                coursewareQueues[selectedQueue].items.push(it);
                            }
                        }
                    }
                    chk.checked = false;
                }
            });
            refreshQueueSelect();
            alert('已添加到队列');
            renderQueueList();
        });
 
        addToQueueContainer.appendChild(queueSelect);
        addToQueueContainer.appendChild(addSelectedBtn);
 
        queueContainer.appendChild(createQueueForm);
        queueContainer.appendChild(addToQueueContainer);
 
        panelContent.appendChild(queueContainer);
    }
 
 
    async function startQueueProcessing(queueName) {
        if (!coursewareQueues[queueName]) {
            alert('队列不存在');
            return;
        }
 
        if (coursewareQueues[queueName].items.length === 0) {
            alert('队列中无课件');
            return;
        }
 
        isQueueProcessing = true;
        const qData = coursewareQueues[queueName];
 
        for (const itemData of qData.items) {
            if (document.hidden) break;
            await jumpToContentItem(itemData.originalElement);
            await new Promise(res => setTimeout(res, 1000));
 
            if (hasPPT(itemData.originalElement)) {
                const pptIframe = itemData.originalElement.querySelector('iframe');
                if (pptIframe) {
                    const pptTaskId = `ppt-${Date.now()}-${Math.random().toString(36).substr(2,5)}`;
                    const iframeSrc = new URL(pptIframe.src);
                    iframeSrc.searchParams.set('pptTaskId', pptTaskId);
                    pptIframe.src = iframeSrc.toString();
 
                    const pptPromise = window.videoController.createPPTTask(pptTaskId);
                    await pptPromise;
                }
            } else if (hasVideo(itemData.originalElement)) {
                const videoEl = itemData.originalElement.querySelector('#dplayer video') || itemData.originalElement.querySelector('video');
                if (videoEl) {
                    const videoTaskId = `video-${Date.now()}-${Math.random().toString(36).substr(2,5)}`;
                    const videoPromise = window.videoController.handleVideo(videoEl, videoTaskId);
                    await videoPromise;
                }
            }
 
            await new Promise(res => setTimeout(res, qData.interval));
        }
 
        isQueueProcessing = false;
        currentQueueName = null;
        alert(`${queueName} 执行完成！`);
    }
 
    function hasPPT(element) {
        return !!element.querySelector('.slide-img-container');
    }
 
    function hasVideo(element) {
        return !!element.querySelector('#dplayer') || !!element.querySelector('video');
    }
 
    function initPptAutoPaging() {
        const progressBarSelector = '.bottom-paging-progress .bar';
        const nextPageButtonSelector = '.slide-img-container.context-menu-disabled .ppt-turn-right-mask';
        const checkInterval = 1000;
        let hasReportedCompletion = false;
 
        let pptIntervalId = setInterval(() => {
            const pptBar = document.querySelector(progressBarSelector);
            const nextButton = document.querySelector(nextPageButtonSelector);
 
            if (pptBar) {
                let width = parseFloat(pptBar.style.width) || 0;
                if (width >= 100 && !hasReportedCompletion) {
                    hasReportedCompletion = true;
                    clearInterval(pptIntervalId);
                    window.parent.postMessage({
                        type: 'pptCompleted',
                        status: 'completed',
                        timestamp: Date.now()
                    }, '*');
                    return;
                }
                if (width < 100 && nextButton) {
                    simulateClick(nextButton);
                }
            }
        }, checkInterval);
 
        pptTimeoutId = setTimeout(() => {
            if (!hasReportedCompletion) {
                hasReportedCompletion = true;
                clearInterval(pptIntervalId);
                window.parent.postMessage({
                    type: 'pptCompleted',
                    status: 'completed',
                    timestamp: Date.now()
                }, '*');
            }
        }, 60000);
    }
 
    async function initialize() {
        await waitForContentLoaded();
        const items = document.querySelectorAll('.third-level-inner-box');
        const categorized = categorizeItems(items);
        const panelContent = createDisplayPanel();
        populatePanel(panelContent, categorized);
        createQueueUI(panelContent, categorized);
    }
 
 
    class VideoController {
        constructor() {
            this.activeVideos = new Map();
            this.pptPromises = new Map();
            this.container = this.createAutoPlayerInterface();
            this.taskContainer = this.container.querySelector('#autoplay-task-container');
            this.activePPTs = new Map();
 
            document.addEventListener('visibilitychange', () => this.handleVisibilityChange());
            window.addEventListener('message', (event) => this.handleMessage(event), false);
        }
 
        createAutoPlayerInterface() {
            if (document.getElementById('autoplay-control-panel')) return document.getElementById('autoplay-control-panel');
 
            const container = document.createElement('div');
            container.id = 'autoplay-control-panel';
            container.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 300px;
                height: 400px;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 15px;
                border-radius: 8px;
                font-family: Arial, sans-serif;
                z-index: 9999;
                box-shadow: 0 2px 10px rgba(0,0,0,0.3);
                overflow-y: auto;
            `;
 
            container.innerHTML = `
                <div style="font-weight:bold;font-size:16px;margin-bottom:10px;">视频/PPT自动播放面板</div>
                <div id="autoplay-task-container"></div>
            `;
 
            document.body.appendChild(container);
            return container;
        }
 
        handleMessage(event) {
            if (event.origin !== `https://${IFRAME_PAGE_HOST}`) return;
            const data = event.data;
            if (!data.type) return;
 
            if (data.type === 'pptCompleted') {
                this.updateTaskUI(data.taskId, 100, 'completed');
                this.activePPTs.delete(data.taskId);
                if (this.pptPromises.has(data.taskId)) {
                    this.pptPromises.get(data.taskId).resolve();
                    this.pptPromises.delete(data.taskId);
                }
            } else if (data.type === 'pptProgress') {
                this.updateTaskUI(data.taskId, data.progress, 'playing');
                if (this.activePPTs.has(data.taskId)) {
                    const pptTask = this.activePPTs.get(data.taskId);
                    pptTask.progress = data.progress;
                }
            }
        }
 
        createTaskElement(taskId, title = `任务 #${taskId}`) {
            const taskDiv = document.createElement('div');
            taskDiv.id = `task-${taskId}`;
            taskDiv.className = 'task-item';
            taskDiv.style.cssText = `
                margin-bottom: 10px;
                padding: 8px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 4px;
            `;
 
            taskDiv.innerHTML = `
                <div style="font-weight:bold;">${title}</div>
                <div class="task-status">状态: 初始化中</div>
                <div style="margin-top:5px;position:relative;height:5px;background:#444;">
                    <div class="progress-fill" style="height:5px;width:0%;background:#28a745;"></div>
                </div>
            `;
 
            this.taskContainer.appendChild(taskDiv);
            return taskDiv;
        }
 
        updateTaskUI(taskId, progress, status) {
            const taskElement = document.querySelector(`#task-${taskId}`);
            if (taskElement) {
                const progressFill = taskElement.querySelector('.progress-fill');
                const statusText = taskElement.querySelector('.task-status');
 
                if (progressFill) {
                    progressFill.style.width = `${progress}%`;
                }
                if (statusText) {
                    statusText.textContent = `状态: ${status} (${progress.toFixed(1)}%)`;
                }
            }
        }
 
        createPPTTask(taskId) {
            this.createTaskElement(taskId, `PPT任务 #${taskId}`);
            this.activePPTs.set(taskId, {
                id: taskId,
                progress: 0,
                status: 'playing'
            });
 
            let resolveFunc;
            const promise = new Promise((resolve) => {
                resolveFunc = resolve;
            });
            this.pptPromises.set(taskId, { resolve: resolveFunc });
            return promise;
        }
 
        handleVideo(video, taskId) {
            return new Promise(async (resolve, reject) => {
                if (!video) {
                    reject(new Error('未找到视频元素'));
                    return;
                }
 
                this.createTaskElement(taskId, `视频任务 #${taskId}`);
 
                try {
                    video.muted = true;
                    video.autoplay = true;
                    video.playsInline = true;
                    video.setAttribute('webkit-playsinline', 'true');
 
                    const applyPlaybackRate = () => {
                        const playbackRate = parseFloat(localStorage.getItem('videoPlaybackSpeed')) || 3;
                        video.playbackRate = playbackRate;
                    };
 
                  
                    const onLoadedMetadata = () => {
                        applyPlaybackRate();
                    };
                    video.addEventListener('loadedmetadata', onLoadedMetadata, { once: true });
 
                   
                    const onCanPlay = () => {
                        applyPlaybackRate();
                    };
                    video.addEventListener('canplay', onCanPlay, { once: true });
 
                    const onTimeUpdate = () => {
                        if (!video.duration) return;
                        const progress = (video.currentTime / video.duration) * 100;
                        this.updateTaskUI(taskId, progress, 'playing');
 
                        if (progress >= 99.9) {
                            this.updateTaskUI(taskId, 100, 'completed');
                            video.removeEventListener('timeupdate', onTimeUpdate);
                        
                            video.removeEventListener('loadedmetadata', onLoadedMetadata);
                            video.removeEventListener('canplay', onCanPlay);
                            resolve();
                        }
                    };
 
                    video.addEventListener('timeupdate', onTimeUpdate);
 
                    await video.play();
                  
                    applyPlaybackRate();
 
                    this.updateTaskUI(taskId, 0, 'playing');
                } catch (error) {
                    console.error('视频播放错误:', error);
                    this.updateTaskUI(taskId, 0, 'error');
                    reject(error);
                }
            });
        }
 
 
        handleVisibilityChange() {}
    }
 
    if (window.location.hostname === MAIN_PAGE_HOST) {
        window.videoController = new VideoController();
      
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) {
                        const videoPlayer = node.id === 'dplayer' ? node : node.querySelector('#dplayer');
                        if (videoPlayer && !videoPlayer.dataset.autoplayInitialized) {
                            videoPlayer.dataset.autoplayInitialized = 'true';
                            const videoTaskId = `video-${Date.now()}-${Math.random().toString(36).substr(2,5)}`;
                            window.videoController.handleVideo(videoPlayer.querySelector('video'), videoTaskId);
                        }
 
                        const pptIframe = (node.tagName === 'IFRAME') ? node : node.querySelector('iframe');
                        if (pptIframe && !pptIframe.dataset.pptInitialized && pptIframe.src.includes('preview.cqooc.com')) {
                            pptIframe.dataset.pptInitialized = 'true';
                            const pptTaskId = `ppt-${Date.now()}-${Math.random().toString(36).substr(2,5)}`;
                            const iframeSrc = new URL(pptIframe.src);
                            iframeSrc.searchParams.set('pptTaskId', pptTaskId);
                            pptIframe.src = iframeSrc.toString();
                            window.videoController.createPPTTask(pptTaskId);
                        }
                    }
                });
            });
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
 
        initialize();
 
    } else if (window.location.hostname === IFRAME_PAGE_HOST) {
        initPptAutoPaging();
    }
 
})();
 