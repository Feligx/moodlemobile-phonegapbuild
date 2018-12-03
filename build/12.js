webpackJsonp([12],{

/***/ 1845:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/@angular/core/esm5/core.js
var core = __webpack_require__(0);

// EXTERNAL MODULE: ./node_modules/ionic-angular/index.js + 3 modules
var ionic_angular = __webpack_require__(8);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/index.js + 1 modules
var _ngx_translate_core = __webpack_require__(3);

// EXTERNAL MODULE: ./src/providers/events.ts
var events = __webpack_require__(12);

// EXTERNAL MODULE: ./src/providers/sites.ts
var sites = __webpack_require__(1);

// EXTERNAL MODULE: ./src/addon/messages/providers/messages.ts
var messages = __webpack_require__(173);

// EXTERNAL MODULE: ./src/addon/messages/providers/messages-offline.ts
var messages_offline = __webpack_require__(343);

// EXTERNAL MODULE: ./src/addon/messages/providers/sync.ts
var sync = __webpack_require__(452);

// EXTERNAL MODULE: ./src/core/user/providers/user.ts
var user = __webpack_require__(43);

// EXTERNAL MODULE: ./src/providers/utils/dom.ts
var dom = __webpack_require__(4);

// EXTERNAL MODULE: ./src/providers/utils/utils.ts
var utils_utils = __webpack_require__(2);

// EXTERNAL MODULE: ./src/providers/logger.ts
var providers_logger = __webpack_require__(5);

// EXTERNAL MODULE: ./src/providers/app.ts
var app = __webpack_require__(10);

// EXTERNAL MODULE: ./src/classes/animations.ts
var animations = __webpack_require__(1425);

// EXTERNAL MODULE: ./src/components/split-view/split-view.ts
var split_view = __webpack_require__(33);

// EXTERNAL MODULE: ./node_modules/ts-md5/dist/md5.js
var md5 = __webpack_require__(198);
var md5_default = /*#__PURE__*/__webpack_require__.n(md5);

// EXTERNAL MODULE: ./node_modules/moment/moment.js
var moment = __webpack_require__(13);
var moment_default = /*#__PURE__*/__webpack_require__.n(moment);

// CONCATENATED MODULE: ./src/addon/messages/pages/discussion/discussion.ts
// (C) Copyright 2015 Martin Dougiamas
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};

















/**
 * Page that displays a message discussion page.
 */
var discussion_AddonMessagesDiscussionPage = /** @class */ (function () {
    function AddonMessagesDiscussionPage(eventsProvider, sitesProvider, navParams, userProvider, navCtrl, messagesSync, domUtils, messagesProvider, logger, utils, appProvider, translate, svComponent, messagesOffline, modalCtrl) {
        var _this = this;
        this.eventsProvider = eventsProvider;
        this.userProvider = userProvider;
        this.navCtrl = navCtrl;
        this.messagesSync = messagesSync;
        this.domUtils = domUtils;
        this.messagesProvider = messagesProvider;
        this.utils = utils;
        this.appProvider = appProvider;
        this.translate = translate;
        this.svComponent = svComponent;
        this.messagesOffline = messagesOffline;
        this.modalCtrl = modalCtrl;
        this.unreadMessageFrom = 0;
        this.messagesBeingSent = 0;
        this.pagesLoaded = 1;
        this.lastMessage = { text: '', timecreated: 0 };
        this.keepMessageMap = {};
        this.oldContentHeight = 0;
        this.scrollBottom = true;
        this.viewDestroyed = false;
        this.loaded = false;
        this.showKeyboard = false;
        this.canLoadMore = false;
        this.loadMoreError = false;
        this.messages = [];
        this.showDelete = false;
        this.canDelete = false;
        this.isGroup = false;
        this.members = {}; // Members that wrote a message, indexed by ID.
        this.siteId = sitesProvider.getCurrentSiteId();
        this.currentUserId = sitesProvider.getCurrentSiteUserId();
        this.groupMessagingEnabled = this.messagesProvider.isGroupMessagingEnabled();
        this.logger = logger.getInstance('AddonMessagesDiscussionPage');
        this.conversationId = navParams.get('conversationId');
        this.userId = navParams.get('userId');
        this.showKeyboard = navParams.get('showKeyboard');
        // Refresh data if this discussion is synchronized automatically.
        this.syncObserver = eventsProvider.on(sync["a" /* AddonMessagesSyncProvider */].AUTO_SYNCED, function (data) {
            if ((data.userId && data.userId == _this.userId) ||
                (data.conversationId && data.conversationId == _this.conversationId)) {
                // Fetch messages.
                _this.fetchMessages();
                // Show first warning if any.
                if (data.warnings && data.warnings[0]) {
                    _this.domUtils.showErrorModal(data.warnings[0]);
                }
            }
        }, this.siteId);
    }
    /**
     * Adds a new message to the message list.
     *
     * @param {any} message Message to be added.
     * @param {boolean} [keep=true] If set the keep flag or not.
     */
    AddonMessagesDiscussionPage.prototype.addMessage = function (message, keep) {
        if (keep === void 0) { keep = true; }
        // Use text instead of message ID because ID changes when a message is read.
        message.hash = md5["Md5"].hashAsciiStr(message.text || '') + '#' + message.timecreated + '#' + message.useridfrom;
        if (typeof this.keepMessageMap[message.hash] === 'undefined') {
            // Message not added to the list. Add it now.
            this.messages.push(message);
        }
        // Message needs to be kept in the list.
        this.keepMessageMap[message.hash] = keep;
    };
    /**
     * Remove a message if it shouldn't be in the list anymore.
     *
     * @param {string} hash Hash of the message to be removed.
     */
    AddonMessagesDiscussionPage.prototype.removeMessage = function (hash) {
        if (this.keepMessageMap[hash]) {
            // Selected to keep it, clear the flag.
            this.keepMessageMap[hash] = false;
            return;
        }
        delete this.keepMessageMap[hash];
        var position = this.messages.findIndex(function (message) {
            return message.hash == hash;
        });
        if (position >= 0) {
            this.messages.splice(position, 1);
        }
    };
    /**
     * Runs when the page has loaded. This event only happens once per page being created.
     * If a page leaves but is cached, then this event will not fire again on a subsequent viewing.
     * Setup code for the page.
     */
    AddonMessagesDiscussionPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        // Disable the profile button if we're already coming from a profile.
        var backViewPage = this.navCtrl.getPrevious() && this.navCtrl.getPrevious().component.name;
        this.showInfo = !backViewPage || backViewPage !== 'CoreUserProfilePage';
        if (!this.groupMessagingEnabled && this.userId) {
            // Get the user profile to retrieve the user fullname and image.
            this.userProvider.getProfile(this.userId, undefined, true).then(function (user) {
                if (!_this.title) {
                    _this.title = user.fullname;
                }
                _this.conversationImage = user.profileimageurl;
            });
        }
        // Synchronize messages if needed.
        this.messagesSync.syncDiscussion(this.conversationId, this.userId).catch(function () {
            // Ignore errors.
        }).then(function (warnings) {
            if (warnings && warnings[0]) {
                _this.domUtils.showErrorModal(warnings[0]);
            }
            if (_this.groupMessagingEnabled) {
                // Get the conversation ID if it exists and we don't have it yet.
                return _this.getConversation(_this.conversationId, _this.userId).then(function (exists) {
                    if (exists) {
                        // Fetch the messages for the first time.
                        return _this.fetchMessages();
                    }
                });
            }
            else {
                // Fetch the messages for the first time.
                return _this.fetchMessages().then(function () {
                    if (!_this.title && _this.messages.length) {
                        // Didn't receive the fullname via argument. Try to get it from messages.
                        // It's possible that name cannot be resolved when no messages were yet exchanged.
                        if (_this.messages[0].useridto != _this.currentUserId) {
                            _this.title = _this.messages[0].usertofullname || '';
                        }
                        else {
                            _this.title = _this.messages[0].userfromfullname || '';
                        }
                    }
                });
            }
        }).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'addon.messages.errorwhileretrievingmessages', true);
        }).finally(function () {
            _this.checkCanDelete();
            _this.resizeContent();
            _this.loaded = true;
            _this.setPolling(); // Make sure we're polling messages.
        });
        // Recalculate footer position when keyboard is shown or hidden.
        this.keyboardObserver = this.eventsProvider.on(events["a" /* CoreEventsProvider */].KEYBOARD_CHANGE, function (kbHeight) {
            _this.content.resize();
        });
    };
    /**
     * Runs when the page has fully entered and is now the active page.
     * This event will fire, whether it was the first load or a cached page.
     */
    AddonMessagesDiscussionPage.prototype.ionViewDidEnter = function () {
        this.setPolling();
    };
    /**
     * Runs when the page is about to leave and no longer be the active page.
     */
    AddonMessagesDiscussionPage.prototype.ionViewWillLeave = function () {
        this.unsetPolling();
    };
    /**
     * Convenience function to fetch messages.
     *
     * @return {Promise<any>} Resolved when done.
     */
    AddonMessagesDiscussionPage.prototype.fetchMessages = function () {
        var _this = this;
        this.loadMoreError = false;
        if (this.messagesBeingSent > 0) {
            // We do not poll while a message is being sent or we could confuse the user.
            // Otherwise, his message would disappear from the list, and he'd have to wait for the interval to check for messages.
            return Promise.reject(null);
        }
        else if (this.fetching) {
            // Already fetching.
            return Promise.reject(null);
        }
        else if (this.groupMessagingEnabled && !this.conversationId) {
            // Don't have enough data to fetch messages.
            return Promise.reject(null);
        }
        if (this.conversationId) {
            this.logger.debug("Polling new messages for conversation '" + this.conversationId + "'");
        }
        else {
            this.logger.debug("Polling new messages for discussion with user '" + this.userId + "'");
        }
        this.fetching = true;
        // Wait for synchronization process to finish.
        return this.messagesSync.waitForSyncConversation(this.conversationId, this.userId).then(function () {
            // Fetch messages. Invalidate the cache before fetching.
            if (_this.groupMessagingEnabled) {
                return _this.messagesProvider.invalidateConversationMessages(_this.conversationId).catch(function () {
                    // Ignore errors.
                }).then(function () {
                    return _this.getConversationMessages(_this.pagesLoaded);
                });
            }
            else {
                return _this.messagesProvider.invalidateDiscussionCache(_this.userId).catch(function () {
                    // Ignore errors.
                }).then(function () {
                    return _this.getDiscussionMessages(_this.pagesLoaded);
                });
            }
        }).then(function (messages) {
            _this.loadMessages(messages);
        }).finally(function () {
            _this.fetching = false;
        });
    };
    /**
     * Format and load a list of messages into the view.
     *
     * @param {any[]} messages Messages to load.
     */
    AddonMessagesDiscussionPage.prototype.loadMessages = function (messages) {
        var _this = this;
        if (this.viewDestroyed) {
            return;
        }
        // Check if we are at the bottom to scroll it after render.
        this.scrollBottom = this.domUtils.getScrollHeight(this.content) - this.domUtils.getScrollTop(this.content) ===
            this.domUtils.getContentHeight(this.content);
        if (this.messagesBeingSent > 0) {
            // Ignore polling due to a race condition.
            return;
        }
        // Add new messages to the list and mark the messages that should still be displayed.
        messages.forEach(function (message) {
            _this.addMessage(message);
        });
        // Remove messages that shouldn't be in the list anymore.
        for (var hash in this.keepMessageMap) {
            this.removeMessage(hash);
        }
        // Sort the messages.
        this.messagesProvider.sortMessages(this.messages);
        // Calculate which messages need to display the date or user data.
        this.messages.forEach(function (message, index) {
            message.showDate = _this.showDate(message, _this.messages[index - 1]);
            message.showUserData = _this.showUserData(message, _this.messages[index - 1]);
        });
        // Notify that there can be a new message.
        this.notifyNewMessage();
        // Mark retrieved messages as read if they are not.
        this.markMessagesAsRead();
    };
    /**
     * Get the conversation.
     *
     * @param {number} conversationId Conversation ID.
     * @param {number} userId User ID.
     * @return {Promise<boolean>} Promise resolved with a boolean: whether the conversation exists or not.
     */
    AddonMessagesDiscussionPage.prototype.getConversation = function (conversationId, userId) {
        var _this = this;
        var promise;
        if (conversationId) {
            // Retrieve the conversation. Invalidate data first to get the right unreadcount.
            promise = this.messagesProvider.invalidateConversation(conversationId).then(function () {
                return _this.messagesProvider.getConversation(conversationId);
            });
        }
        else {
            // We don't have the conversation ID, check if it exists.
            promise = this.messagesProvider.getConversationBetweenUsers(userId).catch(function (error) {
                // Probably conversation does not exist or user is offline. Try to load offline messages.
                return _this.messagesOffline.getMessages(userId).then(function (messages) {
                    if (messages && messages.length) {
                        // We have offline messages, this probably means that the conversation didn't exist. Don't display error.
                        messages.forEach(function (message) {
                            message.pending = true;
                            message.text = message.smallmessage;
                        });
                        _this.loadMessages(messages);
                    }
                    else if (error.errorcode != 'errorconversationdoesnotexist') {
                        // Display the error.
                        return Promise.reject(error);
                    }
                });
            });
        }
        return promise.then(function (conversation) {
            _this.conversation = conversation;
            if (conversation) {
                _this.conversationId = conversation.id;
                _this.title = conversation.name;
                _this.conversationImage = conversation.imageurl;
                _this.isGroup = conversation.type == messages["a" /* AddonMessagesProvider */].MESSAGE_CONVERSATION_TYPE_GROUP;
                if (!_this.isGroup) {
                    _this.userId = conversation.userid;
                }
                return true;
            }
            else {
                return false;
            }
        });
    };
    /**
     * Get the messages of the conversation. Used if group messaging is supported.
     *
     * @param {number} pagesToLoad Number of "pages" to load.
     * @param  {number} [offset=0] Offset for message list.
     * @return {Promise<any[]>} Promise resolved with the list of messages.
     */
    AddonMessagesDiscussionPage.prototype.getConversationMessages = function (pagesToLoad, offset) {
        var _this = this;
        if (offset === void 0) { offset = 0; }
        var excludePending = offset > 0;
        return this.messagesProvider.getConversationMessages(this.conversationId, excludePending, offset).then(function (result) {
            pagesToLoad--;
            // Treat members. Don't use CoreUtilsProvider.arrayToObject because we don't want to override the existing object.
            if (result.members) {
                result.members.forEach(function (member) {
                    _this.members[member.id] = member;
                });
            }
            if (pagesToLoad > 0 && result.canLoadMore) {
                offset += messages["a" /* AddonMessagesProvider */].LIMIT_MESSAGES;
                // Get more messages.
                return _this.getConversationMessages(pagesToLoad, offset).then(function (nextMessages) {
                    return result.messages.concat(nextMessages);
                });
            }
            else {
                // No more messages to load, return them.
                _this.canLoadMore = result.canLoadMore;
                return result.messages;
            }
        });
    };
    /**
     * Get a discussion. Can load several "pages".
     *
     * @param  {number}  pagesToLoad          Number of pages to load.
     * @param  {number}  [lfReceivedUnread=0] Number of unread received messages already fetched, so fetch will be done from this.
     * @param  {number}  [lfReceivedRead=0]   Number of read received messages already fetched, so fetch will be done from this.
     * @param  {number}  [lfSentUnread=0]     Number of unread sent messages already fetched, so fetch will be done from this.
     * @param  {number}  [lfSentRead=0]       Number of read sent messages already fetched, so fetch will be done from this.
     * @return {Promise<any>}  Resolved when done.
     */
    AddonMessagesDiscussionPage.prototype.getDiscussionMessages = function (pagesToLoad, lfReceivedUnread, lfReceivedRead, lfSentUnread, lfSentRead) {
        var _this = this;
        if (lfReceivedUnread === void 0) { lfReceivedUnread = 0; }
        if (lfReceivedRead === void 0) { lfReceivedRead = 0; }
        if (lfSentUnread === void 0) { lfSentUnread = 0; }
        if (lfSentRead === void 0) { lfSentRead = 0; }
        // Only get offline messages if we're loading the first "page".
        var excludePending = lfReceivedUnread > 0 || lfReceivedRead > 0 || lfSentUnread > 0 || lfSentRead > 0;
        // Get next messages.
        return this.messagesProvider.getDiscussion(this.userId, excludePending, lfReceivedUnread, lfReceivedRead, lfSentUnread, lfSentRead).then(function (result) {
            pagesToLoad--;
            if (pagesToLoad > 0 && result.canLoadMore) {
                // More pages to load. Calculate new limit froms.
                result.messages.forEach(function (message) {
                    if (!message.pending) {
                        if (message.useridfrom == _this.userId) {
                            if (message.read) {
                                lfReceivedRead++;
                            }
                            else {
                                lfReceivedUnread++;
                            }
                        }
                        else {
                            if (message.read) {
                                lfSentRead++;
                            }
                            else {
                                lfSentUnread++;
                            }
                        }
                    }
                });
                // Get next messages.
                return _this.getDiscussionMessages(pagesToLoad, lfReceivedUnread, lfReceivedRead, lfSentUnread, lfSentRead)
                    .then(function (nextMessages) {
                    return result.messages.concat(nextMessages);
                });
            }
            else {
                // No more messages to load, return them.
                _this.canLoadMore = result.canLoadMore;
                return result.messages;
            }
        });
    };
    /**
     * Mark messages as read.
     */
    AddonMessagesDiscussionPage.prototype.markMessagesAsRead = function () {
        var _this = this;
        var readChanged = false;
        var promises = [];
        if (this.messagesProvider.isMarkAllMessagesReadEnabled()) {
            var messageUnreadFound = false;
            // Mark all messages at a time if there is any unread message.
            if (this.groupMessagingEnabled) {
                messageUnreadFound = this.conversation && this.conversation.unreadcount > 0 && this.conversationId > 0;
            }
            else {
                for (var x in this.messages) {
                    var message = this.messages[x];
                    // If an unread message is found, mark all messages as read.
                    if (message.useridfrom != this.currentUserId && message.read == 0) {
                        messageUnreadFound = true;
                        break;
                    }
                }
            }
            if (messageUnreadFound) {
                this.setUnreadLabelPosition();
                var promise = void 0;
                if (this.groupMessagingEnabled) {
                    promise = this.messagesProvider.markAllConversationMessagesRead(this.conversationId);
                }
                else {
                    promise = this.messagesProvider.markAllMessagesRead(this.userId).then(function () {
                        // Mark all messages as read.
                        _this.messages.forEach(function (message) {
                            message.read = 1;
                        });
                    });
                }
                promises.push(promise.then(function () {
                    readChanged = true;
                }));
            }
        }
        else {
            this.setUnreadLabelPosition();
            // Mark each message as read one by one.
            this.messages.forEach(function (message) {
                // If the message is unread, call this.messagesProvider.markMessageRead.
                if (message.useridfrom != _this.currentUserId && message.read == 0) {
                    promises.push(_this.messagesProvider.markMessageRead(message.id).then(function () {
                        readChanged = true;
                        message.read = 1;
                    }));
                }
            });
        }
        Promise.all(promises).finally(function () {
            if (readChanged) {
                _this.eventsProvider.trigger(messages["a" /* AddonMessagesProvider */].READ_CHANGED_EVENT, {
                    conversationId: _this.conversationId,
                    userId: _this.userId
                }, _this.siteId);
            }
        });
    };
    /**
     * Notify the last message found so discussions list controller can tell if last message should be updated.
     */
    AddonMessagesDiscussionPage.prototype.notifyNewMessage = function () {
        var last = this.messages[this.messages.length - 1];
        var trigger = false;
        if (!last) {
            this.lastMessage = { text: '', timecreated: 0 };
            trigger = true;
        }
        else if (last.text !== this.lastMessage.text || last.timecreated !== this.lastMessage.timecreated) {
            this.lastMessage = { text: last.text, timecreated: last.timecreated };
            trigger = true;
        }
        if (trigger) {
            // Update discussions last message.
            this.eventsProvider.trigger(messages["a" /* AddonMessagesProvider */].NEW_MESSAGE_EVENT, {
                conversationId: this.conversationId,
                userId: this.userId,
                message: this.lastMessage.text,
                timecreated: this.lastMessage.timecreated
            }, this.siteId);
            // Update navBar links and buttons.
            var newCanDelete = (last && last.id && this.messages.length == 1) || this.messages.length > 1;
            if (this.canDelete != newCanDelete) {
                this.checkCanDelete();
            }
        }
    };
    /**
     * Set the place where the unread label position has to be.
     */
    AddonMessagesDiscussionPage.prototype.setUnreadLabelPosition = function () {
        if (this.unreadMessageFrom != 0) {
            return;
        }
        if (this.groupMessagingEnabled) {
            // Use the unreadcount from the conversation to calculate where should the label be placed.
            if (this.conversation && this.conversation.unreadcount > 0 && this.messages) {
                // Iterate over messages to find the right message using the unreadcount. Skip offline messages and own messages.
                var found = 0;
                for (var i = this.messages.length - 1; i >= 0; i--) {
                    var message = this.messages[i];
                    if (!message.pending && message.useridfrom != this.currentUserId) {
                        found++;
                        if (found == this.conversation.unreadcount) {
                            this.unreadMessageFrom = parseInt(message.id, 10);
                            break;
                        }
                    }
                }
            }
        }
        else {
            var previousMessageRead = false;
            for (var x in this.messages) {
                var message = this.messages[x];
                if (message.useridfrom != this.currentUserId) {
                    var unreadFrom = message.read == 0 && previousMessageRead;
                    if (unreadFrom) {
                        // Save where the label is placed.
                        this.unreadMessageFrom = parseInt(message.id, 10);
                        break;
                    }
                    previousMessageRead = message.read != 0;
                }
            }
        }
        // Do not update the message unread from label on next refresh.
        if (this.unreadMessageFrom == 0) {
            // Using negative to indicate the label is not placed but should not be placed.
            this.unreadMessageFrom = -1;
        }
    };
    /**
     * Check if there's any message in the list that can be deleted.
     */
    AddonMessagesDiscussionPage.prototype.checkCanDelete = function () {
        // All messages being sent should be at the end of the list.
        var first = this.messages[0];
        this.canDelete = first && !first.sending;
    };
    /**
     * Hide unread label when sending messages.
     */
    AddonMessagesDiscussionPage.prototype.hideUnreadLabel = function () {
        if (this.unreadMessageFrom > 0) {
            this.unreadMessageFrom = -1;
        }
    };
    /**
     * Wait until fetching is false.
     * @return {Promise<void>} Resolved when done.
     */
    AddonMessagesDiscussionPage.prototype.waitForFetch = function () {
        var _this = this;
        if (!this.fetching) {
            return Promise.resolve();
        }
        var deferred = this.utils.promiseDefer();
        setTimeout(function () {
            return _this.waitForFetch().finally(function () {
                deferred.resolve();
            });
        }, 400);
        return deferred.promise;
    };
    /**
     * Set a polling to get new messages every certain time.
     */
    AddonMessagesDiscussionPage.prototype.setPolling = function () {
        var _this = this;
        if (this.groupMessagingEnabled && !this.conversationId) {
            // Don't have enough data to poll messages.
            return;
        }
        if (!this.polling) {
            // Start polling.
            this.polling = setInterval(function () {
                _this.fetchMessages().catch(function () {
                    // Ignore errors.
                });
            }, messages["a" /* AddonMessagesProvider */].POLL_INTERVAL);
        }
    };
    /**
     * Unset polling.
     */
    AddonMessagesDiscussionPage.prototype.unsetPolling = function () {
        if (this.polling) {
            this.logger.debug("Cancelling polling for conversation with user '" + this.userId + "'");
            clearInterval(this.polling);
            this.polling = undefined;
        }
    };
    /**
     * Copy message to clipboard.
     *
     * @param {any} message Message to be copied.
     */
    AddonMessagesDiscussionPage.prototype.copyMessage = function (message) {
        this.utils.copyToClipboard(message.smallmessage || message.text || '');
    };
    /**
     * Function to delete a message.
     *
     * @param {any} message  Message object to delete.
     * @param {number} index Index where the message is to delete it from the view.
     */
    AddonMessagesDiscussionPage.prototype.deleteMessage = function (message, index) {
        var _this = this;
        var langKey = message.pending ? 'core.areyousure' : 'addon.messages.deletemessageconfirmation';
        this.domUtils.showConfirm(this.translate.instant(langKey)).then(function () {
            var modal = _this.domUtils.showModalLoading('core.deleting', true);
            return _this.messagesProvider.deleteMessage(message).then(function () {
                // Remove message from the list without having to wait for re-fetch.
                _this.messages.splice(index, 1);
                _this.removeMessage(message.hash);
                _this.notifyNewMessage();
                _this.fetchMessages(); // Re-fetch messages to update cached data.
            }).finally(function () {
                modal.dismiss();
            });
        }).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'addon.messages.errordeletemessage', true);
        });
    };
    /**
     * Function to load previous messages.
     *
     * @param {any} [infiniteComplete] Infinite scroll complete function. Only used from core-infinite-loading.
     * @return {Promise<any>} Resolved when done.
     */
    AddonMessagesDiscussionPage.prototype.loadPrevious = function (infiniteComplete) {
        var _this = this;
        // If there is an ongoing fetch, wait for it to finish.
        return this.waitForFetch().finally(function () {
            _this.pagesLoaded++;
            _this.fetchMessages().catch(function (error) {
                _this.loadMoreError = true; // Set to prevent infinite calls with infinite-loading.
                _this.pagesLoaded--;
                _this.domUtils.showErrorModalDefault(error, 'addon.messages.errorwhileretrievingmessages', true);
            }).finally(function () {
                infiniteComplete && infiniteComplete();
            });
        });
    };
    /**
     * Content or scroll has been resized. For content, only call it if it's been added on top.
     */
    AddonMessagesDiscussionPage.prototype.resizeContent = function () {
        var _this = this;
        var top = this.content.getContentDimensions().scrollTop;
        this.content.resize();
        // Wait for new content height to be calculated.
        setTimeout(function () {
            // Visible content size changed, maintain the bottom position.
            if (!_this.viewDestroyed && _this.content && _this.domUtils.getContentHeight(_this.content) != _this.oldContentHeight) {
                if (!top) {
                    top = _this.content.getContentDimensions().scrollTop;
                }
                top += _this.oldContentHeight - _this.domUtils.getContentHeight(_this.content);
                _this.oldContentHeight = _this.domUtils.getContentHeight(_this.content);
                _this.domUtils.scrollTo(_this.content, 0, top, 0);
            }
        });
    };
    /**
     * Scroll bottom when render has finished.
     */
    AddonMessagesDiscussionPage.prototype.scrollToBottom = function () {
        var _this = this;
        // Check if scroll is at bottom. If so, scroll bottom after rendering since there might be something new.
        if (this.scrollBottom) {
            // Need a timeout to leave time to the view to be rendered.
            setTimeout(function () {
                if (!_this.viewDestroyed) {
                    _this.domUtils.scrollToBottom(_this.content, 0);
                }
            });
            this.scrollBottom = false;
        }
    };
    /**
     * Sends a message to the server.
     *
     * @param {string} text Message text.
     */
    AddonMessagesDiscussionPage.prototype.sendMessage = function (text) {
        var _this = this;
        var message;
        this.hideUnreadLabel();
        this.showDelete = false;
        this.scrollBottom = true;
        message = {
            pending: true,
            sending: true,
            useridfrom: this.currentUserId,
            smallmessage: text,
            text: text,
            timecreated: new Date().getTime()
        };
        message.showDate = this.showDate(message, this.messages[this.messages.length - 1]);
        this.addMessage(message, false);
        this.messagesBeingSent++;
        // If there is an ongoing fetch, wait for it to finish.
        // Otherwise, if a message is sent while fetching it could disappear until the next fetch.
        this.waitForFetch().finally(function () {
            var promise;
            if (_this.conversationId) {
                promise = _this.messagesProvider.sendMessageToConversation(_this.conversation, text);
            }
            else {
                promise = _this.messagesProvider.sendMessage(_this.userId, text);
            }
            promise.then(function (data) {
                var promise;
                _this.messagesBeingSent--;
                if (data.sent) {
                    if (!_this.conversationId && data.message && data.message.conversationid) {
                        // Message sent to a new conversation, try to load the conversation.
                        promise = _this.getConversation(data.message.conversationid, _this.userId).then(function () {
                            // Now fetch messages.
                            return _this.fetchMessages();
                        }).finally(function () {
                            // Start polling messages now that the conversation exists.
                            _this.setPolling();
                        });
                    }
                    else {
                        // Message was sent, fetch messages right now.
                        promise = _this.fetchMessages();
                    }
                }
                else {
                    promise = Promise.reject(null);
                }
                promise.catch(function () {
                    // Fetch failed or is offline message, mark the message as sent.
                    // If fetch is successful there's no need to mark it because the fetch will already show the message received.
                    message.sending = false;
                    if (data.sent) {
                        // Message sent to server, not pending anymore.
                        message.pending = false;
                    }
                    else if (data.message) {
                        message.timecreated = data.message.timecreated;
                    }
                    _this.notifyNewMessage();
                });
            }).catch(function (error) {
                _this.messagesBeingSent--;
                // Only close the keyboard if an error happens.
                // We want the user to be able to send multiple messages without the keyboard being closed.
                _this.appProvider.closeKeyboard();
                _this.domUtils.showErrorModalDefault(error, 'addon.messages.messagenotsent', true);
                _this.removeMessage(message.hash);
            });
        });
    };
    /**
     * Check date should be shown on message list for the current message.
     * If date has changed from previous to current message it should be shown.
     *
     * @param {any} message       Current message where to show the date.
     * @param {any} [prevMessage] Previous message where to compare the date with.
     * @return {boolean}  If date has changed and should be shown.
     */
    AddonMessagesDiscussionPage.prototype.showDate = function (message, prevMessage) {
        if (!prevMessage) {
            // First message, show it.
            return true;
        }
        // Check if day has changed.
        return !moment(message.timecreated).isSame(prevMessage.timecreated, 'day');
    };
    /**
     * Check if the user info should be displayed for the current message.
     * User data is only displayed for group conversations if the previous message was from another user.
     *
     * @param {any} message Current message where to show the user info.
     * @param {any} [prevMessage] Previous message.
     * @return {boolean} Whether user data should be shown.
     */
    AddonMessagesDiscussionPage.prototype.showUserData = function (message, prevMessage) {
        return this.isGroup && message.useridfrom != this.currentUserId && this.members[message.useridfrom] &&
            (!prevMessage || prevMessage.useridfrom != message.useridfrom || message.showDate);
    };
    /**
     * Toggles delete state.
     */
    AddonMessagesDiscussionPage.prototype.toggleDelete = function () {
        this.showDelete = !this.showDelete;
    };
    /**
     * View info. If it's an individual conversation, go to the user profile.
     * If it's a group conversation, view info about the group.
     */
    AddonMessagesDiscussionPage.prototype.viewInfo = function () {
        var _this = this;
        if (this.isGroup) {
            // Display the group information.
            var modal = this.modalCtrl.create('AddonMessagesConversationInfoPage', {
                conversationId: this.conversationId
            });
            modal.present();
            modal.onDidDismiss(function (userId) {
                if (typeof userId != 'undefined') {
                    // Open user conversation.
                    if (_this.svComponent) {
                        // Notify the left pane to load it, this way the right conversation will be highlighted.
                        _this.eventsProvider.trigger(messages["a" /* AddonMessagesProvider */].OPEN_CONVERSATION_EVENT, { userId: userId }, _this.siteId);
                    }
                    else {
                        // Open the discussion in a new view.
                        _this.navCtrl.push('AddonMessagesDiscussionPage', { userId: userId });
                    }
                }
            });
        }
        else {
            // Open the user profile.
            var navCtrl = this.svComponent ? this.svComponent.getMasterNav() : this.navCtrl;
            navCtrl.push('CoreUserProfilePage', { userId: this.userId });
        }
    };
    /**
     * Page destroyed.
     */
    AddonMessagesDiscussionPage.prototype.ngOnDestroy = function () {
        // Unset again, just in case.
        this.unsetPolling();
        this.syncObserver && this.syncObserver.off();
        this.keyboardObserver && this.keyboardObserver.off();
        this.viewDestroyed = true;
    };
    __decorate([
        Object(core["_9" /* ViewChild */])(ionic_angular["f" /* Content */]),
        __metadata("design:type", ionic_angular["f" /* Content */])
    ], AddonMessagesDiscussionPage.prototype, "content", void 0);
    AddonMessagesDiscussionPage = __decorate([
        Object(core["m" /* Component */])({
            selector: 'page-addon-messages-discussion',
            templateUrl: 'discussion.html',
            animations: [animations["b" /* coreSlideInOut */]]
        }),
        __param(12, Object(core["N" /* Optional */])()),
        __metadata("design:paramtypes", [events["a" /* CoreEventsProvider */], sites["a" /* CoreSitesProvider */], ionic_angular["t" /* NavParams */],
            user["a" /* CoreUserProvider */], ionic_angular["s" /* NavController */], sync["a" /* AddonMessagesSyncProvider */],
            dom["a" /* CoreDomUtilsProvider */], messages["a" /* AddonMessagesProvider */], providers_logger["a" /* CoreLoggerProvider */],
            utils_utils["a" /* CoreUtilsProvider */], app["a" /* CoreAppProvider */], _ngx_translate_core["c" /* TranslateService */],
            split_view["a" /* CoreSplitViewComponent */], messages_offline["a" /* AddonMessagesOfflineProvider */],
            ionic_angular["q" /* ModalController */]])
    ], AddonMessagesDiscussionPage);
    return AddonMessagesDiscussionPage;
}());

//# sourceMappingURL=discussion.js.map
// EXTERNAL MODULE: ./src/components/components.module.ts
var components_module = __webpack_require__(27);

// EXTERNAL MODULE: ./src/directives/directives.module.ts + 2 modules
var directives_module = __webpack_require__(28);

// EXTERNAL MODULE: ./src/pipes/pipes.module.ts + 1 modules
var pipes_module = __webpack_require__(107);

// CONCATENATED MODULE: ./src/addon/messages/pages/discussion/discussion.module.ts
// (C) Copyright 2015 Martin Dougiamas
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
var discussion_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var discussion_module_AddonMessagesDiscussionPageModule = /** @class */ (function () {
    function AddonMessagesDiscussionPageModule() {
    }
    AddonMessagesDiscussionPageModule = discussion_module___decorate([
        Object(core["I" /* NgModule */])({
            declarations: [
                discussion_AddonMessagesDiscussionPage,
            ],
            imports: [
                components_module["a" /* CoreComponentsModule */],
                directives_module["a" /* CoreDirectivesModule */],
                pipes_module["a" /* CorePipesModule */],
                ionic_angular["l" /* IonicPageModule */].forChild(discussion_AddonMessagesDiscussionPage),
                _ngx_translate_core["b" /* TranslateModule */].forChild()
            ],
        })
    ], AddonMessagesDiscussionPageModule);
    return AddonMessagesDiscussionPageModule;
}());

//# sourceMappingURL=discussion.module.js.map
// EXTERNAL MODULE: ./node_modules/ionic-angular/components/action-sheet/action-sheet-component.ngfactory.js
var action_sheet_component_ngfactory = __webpack_require__(1344);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/alert/alert-component.ngfactory.js
var alert_component_ngfactory = __webpack_require__(1345);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/app/app-root.ngfactory.js
var app_root_ngfactory = __webpack_require__(1346);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/loading/loading-component.ngfactory.js
var loading_component_ngfactory = __webpack_require__(1347);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/modal/modal-component.ngfactory.js
var modal_component_ngfactory = __webpack_require__(1348);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/picker/picker-component.ngfactory.js + 1 modules
var picker_component_ngfactory = __webpack_require__(1349);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/popover/popover-component.ngfactory.js
var popover_component_ngfactory = __webpack_require__(1350);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/select/select-popover-component.ngfactory.js
var select_popover_component_ngfactory = __webpack_require__(1351);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toast/toast-component.ngfactory.js
var toast_component_ngfactory = __webpack_require__(1352);

// EXTERNAL MODULE: ./src/components/context-menu/context-menu-popover.ngfactory.js
var context_menu_popover_ngfactory = __webpack_require__(1355);

// EXTERNAL MODULE: ./src/components/course-picker-menu/course-picker-menu-popover.ngfactory.js
var course_picker_menu_popover_ngfactory = __webpack_require__(1356);

// EXTERNAL MODULE: ./src/components/recaptcha/recaptchamodal.ngfactory.js
var recaptchamodal_ngfactory = __webpack_require__(1357);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/chip/chip.js
var chip = __webpack_require__(706);

// EXTERNAL MODULE: ./node_modules/ionic-angular/config/config.js
var config = __webpack_require__(6);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/label/label.js
var label = __webpack_require__(61);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.pipe.js
var translate_pipe = __webpack_require__(24);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.service.js
var translate_service = __webpack_require__(17);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/icon/icon.js
var icon = __webpack_require__(45);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/avatar/avatar.js
var avatar = __webpack_require__(185);

// EXTERNAL MODULE: ./src/directives/external-content.ts
var external_content = __webpack_require__(227);

// EXTERNAL MODULE: ./src/providers/filepool.ts
var filepool = __webpack_require__(16);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/platform.js + 1 modules
var platform = __webpack_require__(14);

// EXTERNAL MODULE: ./src/providers/utils/url.ts
var url = __webpack_require__(25);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/note/note.js
var note = __webpack_require__(225);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/button/button.ngfactory.js
var button_ngfactory = __webpack_require__(44);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/button/button.js
var button_button = __webpack_require__(41);

// EXTERNAL MODULE: ./node_modules/@angular/common/esm5/common.js
var common = __webpack_require__(7);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item.ngfactory.js + 1 modules
var item_ngfactory = __webpack_require__(29);

// EXTERNAL MODULE: ./src/directives/long-press.ts
var long_press = __webpack_require__(1422);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item.js
var item = __webpack_require__(20);

// EXTERNAL MODULE: ./node_modules/ionic-angular/util/form.js
var util_form = __webpack_require__(19);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-reorder.js + 1 modules
var item_reorder = __webpack_require__(26);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-content.js
var item_content = __webpack_require__(31);

// EXTERNAL MODULE: ./src/directives/format-text.ts
var format_text = __webpack_require__(39);

// EXTERNAL MODULE: ./src/providers/utils/text.ts
var utils_text = __webpack_require__(9);

// EXTERNAL MODULE: ./src/core/contentlinks/providers/helper.ts
var helper = __webpack_require__(18);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-controller.js
var nav_controller = __webpack_require__(21);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.js
var content = __webpack_require__(23);

// EXTERNAL MODULE: ./src/providers/utils/iframe.ts
var iframe = __webpack_require__(36);

// EXTERNAL MODULE: ./src/components/empty-box/empty-box.ngfactory.js
var empty_box_ngfactory = __webpack_require__(119);

// EXTERNAL MODULE: ./src/components/empty-box/empty-box.ts
var empty_box = __webpack_require__(110);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-footer.js
var toolbar_footer = __webpack_require__(681);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/view-controller.js
var view_controller = __webpack_require__(35);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar.ngfactory.js
var toolbar_ngfactory = __webpack_require__(1957);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar.js
var toolbar = __webpack_require__(247);

// EXTERNAL MODULE: ./src/components/send-message-form/send-message-form.ngfactory.js
var send_message_form_ngfactory = __webpack_require__(1960);

// EXTERNAL MODULE: ./src/components/send-message-form/send-message-form.ts
var send_message_form = __webpack_require__(1369);

// EXTERNAL MODULE: ./src/pipes/format-date.ts
var format_date = __webpack_require__(223);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-header.js
var toolbar_header = __webpack_require__(434);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/navbar.ngfactory.js
var navbar_ngfactory = __webpack_require__(1353);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/navbar.js
var navbar = __webpack_require__(200);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/app/app.js + 3 modules
var app_app = __webpack_require__(32);

// EXTERNAL MODULE: ./src/directives/back-button.ts
var back_button = __webpack_require__(662);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-title.ngfactory.js
var toolbar_title_ngfactory = __webpack_require__(1354);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-title.js
var toolbar_title = __webpack_require__(335);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-item.js
var toolbar_item = __webpack_require__(435);

// EXTERNAL MODULE: ./src/components/navbar-buttons/navbar-buttons.ngfactory.js
var navbar_buttons_ngfactory = __webpack_require__(84);

// EXTERNAL MODULE: ./src/components/navbar-buttons/navbar-buttons.ts
var navbar_buttons = __webpack_require__(77);

// EXTERNAL MODULE: ./src/components/context-menu/context-menu.ngfactory.js
var context_menu_ngfactory = __webpack_require__(87);

// EXTERNAL MODULE: ./src/components/context-menu/context-menu.ts
var context_menu = __webpack_require__(72);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/popover/popover-controller.js
var popover_controller = __webpack_require__(62);

// EXTERNAL MODULE: ./src/components/tabs/tab.ts
var tab = __webpack_require__(71);

// EXTERNAL MODULE: ./src/components/context-menu/context-menu-item.ngfactory.js
var context_menu_item_ngfactory = __webpack_require__(88);

// EXTERNAL MODULE: ./src/components/context-menu/context-menu-item.ts
var context_menu_item = __webpack_require__(79);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.ngfactory.js
var content_ngfactory = __webpack_require__(184);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/dom-controller.js
var dom_controller = __webpack_require__(30);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/keyboard.js
var keyboard = __webpack_require__(108);

// EXTERNAL MODULE: ./src/components/loading/loading.ngfactory.js
var loading_ngfactory = __webpack_require__(48);

// EXTERNAL MODULE: ./src/components/loading/loading.ts
var loading = __webpack_require__(47);

// EXTERNAL MODULE: ./src/components/infinite-loading/infinite-loading.ngfactory.js
var infinite_loading_ngfactory = __webpack_require__(440);

// EXTERNAL MODULE: ./src/components/infinite-loading/infinite-loading.ts
var infinite_loading = __webpack_require__(277);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/list/list.js + 1 modules
var list = __webpack_require__(76);

// EXTERNAL MODULE: ./node_modules/ionic-angular/gestures/gesture-controller.js
var gesture_controller = __webpack_require__(37);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-params.js
var nav_params = __webpack_require__(60);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/modal/modal-controller.js
var modal_controller = __webpack_require__(204);

// CONCATENATED MODULE: ./src/addon/messages/pages/discussion/discussion.ngfactory.js
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 












































































var styles_AddonMessagesDiscussionPage = [];
var RenderType_AddonMessagesDiscussionPage = core["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_AddonMessagesDiscussionPage, data: { "animation": [{ type: 7, name: "coreSlideInOut", definitions: [{ type: 1, expr: "void => fromLeft", animation: [{ type: 6, styles: { transform: "translateX(0)", opacity: 1 }, offset: null }, { type: 4, styles: { type: 5, steps: [{ type: 6, styles: { opacity: 0, transform: "translateX(-100%)", offset: 0 }, offset: null }, { type: 6, styles: { opacity: 1, transform: "translateX(5%)", offset: 0.7 }, offset: null }, { type: 6, styles: { opacity: 1, transform: "translateX(0)", offset: 1 }, offset: null }] }, timings: 300 }], options: null }, { type: 1, expr: "fromLeft => void", animation: [{ type: 6, styles: { transform: "translateX(-100%)", opacity: 0 }, offset: null }, { type: 4, styles: { type: 5, steps: [{ type: 6, styles: { opacity: 1, transform: "translateX(0)", offset: 0 }, offset: null }, { type: 6, styles: { opacity: 1, transform: "translateX(5%)", offset: 0.3 }, offset: null }, { type: 6, styles: { opacity: 0, transform: "translateX(-100%)", offset: 1 }, offset: null }] }, timings: 300 }], options: null }, { type: 1, expr: "void => fromRight", animation: [{ type: 6, styles: { transform: "translateX(0)", opacity: 1 }, offset: null }, { type: 4, styles: { type: 5, steps: [{ type: 6, styles: { opacity: 0, transform: "translateX(100%)", offset: 0 }, offset: null }, { type: 6, styles: { opacity: 1, transform: "translateX(-5%)", offset: 0.7 }, offset: null }, { type: 6, styles: { opacity: 1, transform: "translateX(0)", offset: 1 }, offset: null }] }, timings: 300 }], options: null }, { type: 1, expr: "fromRight => void", animation: [{ type: 6, styles: { transform: "translateX(-100%)", opacity: 0 }, offset: null }, { type: 4, styles: { type: 5, steps: [{ type: 6, styles: { opacity: 1, transform: "translateX(0)", offset: 0 }, offset: null }, { type: 6, styles: { opacity: 1, transform: "translateX(-5%)", offset: 0.3 }, offset: null }, { type: 6, styles: { opacity: 0, transform: "translateX(100%)", offset: 1 }, offset: null }] }, timings: 300 }], options: null }], options: {} }] } });

function View_AddonMessagesDiscussionPage_1(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 0, "img", [["class", "core-bar-button-image"]], [[8, "src", 4]], null, null, null, null))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.conversationImage; _ck(_v, 0, 0, currVal_0); }); }
function View_AddonMessagesDiscussionPage_3(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 7, "ion-chip", [["class", "addon-messages-date"], ["color", "light"]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, chip["a" /* Chip */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { color: [0, "color"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 3, "ion-label", [], null, null, null, null, null)), core["_30" /* ɵdid */](4, 16384, null, 0, label["a" /* Label */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [8, null], [8, null], [8, null], [8, null]], null, null), (_l()(), core["_55" /* ɵted */](5, null, ["", ""])), core["_49" /* ɵppd */](6, 2), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "]))], function (_ck, _v) { var currVal_0 = "light"; _ck(_v, 1, 0, currVal_0); }, function (_ck, _v) { var currVal_1 = core["_56" /* ɵunv */](_v, 5, 0, _ck(_v, 6, 0, core["_44" /* ɵnov */](_v.parent.parent, 0), _v.parent.context.$implicit.timecreated, "LL")); _ck(_v, 5, 0, currVal_1); }); }
function View_AddonMessagesDiscussionPage_4(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 11, "ion-chip", [["class", "addon-messages-unreadfrom"], ["color", "light"]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, chip["a" /* Chip */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { color: [0, "color"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 4, "ion-label", [], null, null, null, null, null)), core["_30" /* ɵdid */](4, 16384, null, 0, label["a" /* Label */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [8, null], [8, null], [8, null], [8, null]], null, null), (_l()(), core["_55" /* ɵted */](5, null, ["", ""])), core["_48" /* ɵpod */](6, { $a: 0 }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](9, 0, null, null, 1, "ion-icon", [["name", "arrow-round-down"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](10, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "]))], function (_ck, _v) { var currVal_0 = "light"; _ck(_v, 1, 0, currVal_0); var currVal_3 = "arrow-round-down"; _ck(_v, 10, 0, currVal_3); }, function (_ck, _v) { var _co = _v.component; var currVal_1 = core["_56" /* ɵunv */](_v, 5, 0, core["_44" /* ɵnov */](_v, 7).transform("addon.messages.newmessages", _ck(_v, 6, 0, _co.title))); _ck(_v, 5, 0, currVal_1); var currVal_2 = core["_44" /* ɵnov */](_v, 10)._hidden; _ck(_v, 9, 0, currVal_2); }); }
function View_AddonMessagesDiscussionPage_5(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 7, "ion-avatar", [["item-start", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, avatar["a" /* Avatar */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 3, "img", [["core-external-content", ""], ["onError", "this.src='assets/img/user-avatar.png'"]], [[8, "src", 4], [8, "alt", 0]], null, null, null, null)), core["_30" /* ɵdid */](4, 4210688, null, 0, external_content["a" /* CoreExternalContentDirective */], [core["t" /* ElementRef */], providers_logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], platform["a" /* Platform */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], app["a" /* CoreAppProvider */], utils_utils["a" /* CoreUtilsProvider */]], null, null), core["_48" /* ɵpod */](5, { $a: 0 }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.members[_v.parent.context.$implicit.useridfrom].profileimageurl; var currVal_1 = core["_56" /* ɵunv */](_v, 3, 1, core["_44" /* ɵnov */](_v, 6).transform("core.pictureof", _ck(_v, 5, 0, _co.members[_v.parent.context.$implicit.useridfrom].fullname))); _ck(_v, 3, 0, currVal_0, currVal_1); }); }
function View_AddonMessagesDiscussionPage_6(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "h2", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](1, null, ["", ""]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.members[_v.parent.context.$implicit.useridfrom].fullname; _ck(_v, 1, 0, currVal_0); }); }
function View_AddonMessagesDiscussionPage_7(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 3, "ion-note", [], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, note["a" /* Note */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](2, null, ["\n                        ", "\n                    "])), core["_49" /* ɵppd */](3, 2)], null, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 2, 0, _ck(_v, 3, 0, core["_44" /* ɵnov */](_v.parent.parent, 0), _v.parent.context.$implicit.timecreated, "dftimedate")); _ck(_v, 2, 0, currVal_0); }); }
function View_AddonMessagesDiscussionPage_8(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 3, "ion-note", [], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, note["a" /* Note */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_31" /* ɵeld */](2, 0, null, null, 1, "ion-icon", [["name", "time"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](3, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null)], function (_ck, _v) { var currVal_1 = "time"; _ck(_v, 3, 0, currVal_1); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 3)._hidden; _ck(_v, 2, 0, currVal_0); }); }
function View_AddonMessagesDiscussionPage_9(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 6, "button", [["class", "addon-messages-delete-button"], ["clear", "true"], ["icon-only", ""], ["ion-button", ""]], [[24, "@coreSlideInOut", 0], [1, "aria-label", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.deleteMessage(_v.parent.context.$implicit, _v.parent.context.index) !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](1, 1097728, [[5, 4]], 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { clear: [0, "clear"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](4, 0, null, 0, 1, "ion-icon", [["color", "danger"], ["name", "trash"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](5, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { color: [0, "color"], name: [1, "name"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                    "]))], function (_ck, _v) { var currVal_2 = "true"; _ck(_v, 1, 0, currVal_2); var currVal_4 = "danger"; var currVal_5 = "trash"; _ck(_v, 5, 0, currVal_4, currVal_5); }, function (_ck, _v) { var currVal_0 = "fromRight"; var currVal_1 = core["_56" /* ɵunv */](_v, 0, 1, core["_44" /* ɵnov */](_v, 2).transform("addon.messages.deletemessage")); _ck(_v, 0, 0, currVal_0, currVal_1); var currVal_3 = core["_44" /* ɵnov */](_v, 5)._hidden; _ck(_v, 4, 0, currVal_3); }); }
function View_AddonMessagesDiscussionPage_2(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 39, null, null, null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonMessagesDiscussionPage_3)), core["_30" /* ɵdid */](3, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonMessagesDiscussionPage_4)), core["_30" /* ɵdid */](6, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n                "])), (_l()(), core["_31" /* ɵeld */](8, 0, null, null, 30, "ion-item", [["class", "addon-message item item-block"], ["text-wrap", ""]], [[2, "addon-message-mine", null], [24, "@coreSlideInOut", 0]], [[null, "longPress"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("longPress" === en)) {
        var pd_0 = (_co.copyMessage(_v.context.$implicit) !== false);
        ad = (pd_0 && ad);
    } return ad; }, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](9, 212992, null, 0, long_press["a" /* CoreLongPressDirective */], [core["t" /* ElementRef */]], null, { longPress: "longPress" }), core["_30" /* ɵdid */](10, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 4, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 5, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 6, { _icons: 1 }), core["_30" /* ɵdid */](14, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonMessagesDiscussionPage_5)), core["_30" /* ɵdid */](18, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, 2, 1, null, View_AddonMessagesDiscussionPage_6)), core["_30" /* ɵdid */](21, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n\n                    "])), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](24, 0, null, 2, 4, "p", [["class", "addon-message-text"]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](26, 0, null, null, 1, "core-format-text", [], null, [[null, "afterRender"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("afterRender" === en)) {
        var pd_0 = ((_v.context.last && _co.scrollToBottom()) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), core["_30" /* ɵdid */](27, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform["a" /* Platform */], utils_utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], providers_logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], app["a" /* CoreAppProvider */], helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */]], { text: [0, "text"] }, { afterRender: "afterRender" }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, 2, 1, null, View_AddonMessagesDiscussionPage_7)), core["_30" /* ɵdid */](31, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, 2, 1, null, View_AddonMessagesDiscussionPage_8)), core["_30" /* ɵdid */](34, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, 2, 1, null, View_AddonMessagesDiscussionPage_9)), core["_30" /* ɵdid */](37, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _v.context.$implicit.showDate; _ck(_v, 3, 0, currVal_0); var currVal_1 = (_co.unreadMessageFrom && (_v.context.$implicit.id == _co.unreadMessageFrom)); _ck(_v, 6, 0, currVal_1); _ck(_v, 9, 0); var currVal_4 = _v.context.$implicit.showUserData; _ck(_v, 18, 0, currVal_4); var currVal_5 = _v.context.$implicit.showUserData; _ck(_v, 21, 0, currVal_5); var currVal_6 = _v.context.$implicit.text; _ck(_v, 27, 0, currVal_6); var currVal_7 = !_v.context.$implicit.pending; _ck(_v, 31, 0, currVal_7); var currVal_8 = _v.context.$implicit.pending; _ck(_v, 34, 0, currVal_8); var currVal_9 = (!_v.context.$implicit.sending && _co.showDelete); _ck(_v, 37, 0, currVal_9); }, function (_ck, _v) { var _co = _v.component; var currVal_2 = (_v.context.$implicit.useridfrom == _co.currentUserId); var currVal_3 = ((_v.context.$implicit.useridfrom == _co.currentUserId) ? "" : "fromLeft"); _ck(_v, 8, 0, currVal_2, currVal_3); }); }
function View_AddonMessagesDiscussionPage_10(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "core-empty-box", [["icon", "chatbubbles"]], null, null, null, empty_box_ngfactory["b" /* View_CoreEmptyBoxComponent_0 */], empty_box_ngfactory["a" /* RenderType_CoreEmptyBoxComponent */])), core["_30" /* ɵdid */](1, 49152, null, 0, empty_box["a" /* CoreEmptyBoxComponent */], [], { message: [0, "message"], icon: [1, "icon"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 1, 0, core["_44" /* ɵnov */](_v, 2).transform("addon.messages.nomessages")); var currVal_1 = "chatbubbles"; _ck(_v, 1, 0, currVal_0, currVal_1); }, null); }
function View_AddonMessagesDiscussionPage_11(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 11, "ion-footer", [["class", "footer-adjustable"], ["color", "light"]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, toolbar_footer["a" /* Footer */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, view_controller["a" /* ViewController */]]], { color: [0, "color"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 7, "ion-toolbar", [["class", "toolbar"], ["color", "light"], ["position", "bottom"]], [[2, "statusbar-padding", null]], null, null, toolbar_ngfactory["b" /* View_Toolbar_0 */], toolbar_ngfactory["a" /* RenderType_Toolbar */])), core["_30" /* ɵdid */](4, 49152, null, 0, toolbar["a" /* Toolbar */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { color: [0, "color"] }, null), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n        "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 3, 2, "core-send-message-form", [], null, [[null, "onSubmit"], [null, "onResize"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("onSubmit" === en)) {
        var pd_0 = (_co.sendMessage($event) !== false);
        ad = (pd_0 && ad);
    } if (("onResize" === en)) {
        var pd_1 = (_co.resizeContent() !== false);
        ad = (pd_1 && ad);
    } return ad; }, send_message_form_ngfactory["b" /* View_CoreSendMessageFormComponent_0 */], send_message_form_ngfactory["a" /* RenderType_CoreSendMessageFormComponent */])), core["_30" /* ɵdid */](8, 114688, null, 0, send_message_form["a" /* CoreSendMessageFormComponent */], [utils_utils["a" /* CoreUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */]], { placeholder: [0, "placeholder"], showKeyboard: [1, "showKeyboard"] }, { onSubmit: "onSubmit", onResize: "onResize" }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = "light"; _ck(_v, 1, 0, currVal_0); var currVal_2 = "light"; _ck(_v, 4, 0, currVal_2); var currVal_3 = core["_56" /* ɵunv */](_v, 8, 0, core["_44" /* ɵnov */](_v, 9).transform("addon.messages.newmessage")); var currVal_4 = _co.showKeyboard; _ck(_v, 8, 0, currVal_3, currVal_4); }, function (_ck, _v) { var currVal_1 = core["_44" /* ɵnov */](_v, 4)._sbPadding; _ck(_v, 3, 0, currVal_1); }); }
function View_AddonMessagesDiscussionPage_0(_l) { return core["_57" /* ɵvid */](0, [core["_47" /* ɵpid */](0, format_date["a" /* CoreFormatDatePipe */], [providers_logger["a" /* CoreLoggerProvider */], translate_service["a" /* TranslateService */]]), core["_52" /* ɵqud */](402653184, 1, { content: 0 }), (_l()(), core["_31" /* ɵeld */](2, 0, null, null, 42, "ion-header", [], null, null, null, null, null)), core["_30" /* ɵdid */](3, 16384, null, 0, toolbar_header["a" /* Header */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, view_controller["a" /* ViewController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_31" /* ɵeld */](5, 0, null, null, 17, "ion-navbar", [["class", "toolbar"], ["core-back-button", ""]], [[8, "hidden", 0], [2, "statusbar-padding", null]], null, null, navbar_ngfactory["b" /* View_Navbar_0 */], navbar_ngfactory["a" /* RenderType_Navbar */])), core["_30" /* ɵdid */](6, 49152, null, 0, navbar["a" /* Navbar */], [app_app["a" /* App */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), core["_30" /* ɵdid */](7, 212992, null, 0, back_button["a" /* CoreBackButtonDirective */], [navbar["a" /* Navbar */], platform["a" /* Platform */], translate_service["a" /* TranslateService */], events["a" /* CoreEventsProvider */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n        "])), (_l()(), core["_31" /* ɵeld */](9, 0, null, 3, 8, "ion-title", [], null, null, null, toolbar_title_ngfactory["b" /* View_ToolbarTitle_0 */], toolbar_title_ngfactory["a" /* RenderType_ToolbarTitle */])), core["_30" /* ɵdid */](10, 49152, null, 0, toolbar_title["a" /* ToolbarTitle */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonMessagesDiscussionPage_1)), core["_30" /* ɵdid */](13, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n            "])), (_l()(), core["_31" /* ɵeld */](15, 0, null, 0, 1, "core-format-text", [], null, null, null, null, null)), core["_30" /* ɵdid */](16, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform["a" /* Platform */], utils_utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], providers_logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], app["a" /* CoreAppProvider */], helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */]], { text: [0, "text"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n        "])), (_l()(), core["_31" /* ɵeld */](19, 0, null, 2, 2, "ion-buttons", [["end", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](20, 16384, null, 1, toolbar_item["a" /* ToolbarItem */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), core["_52" /* ɵqud */](603979776, 2, { _buttons: 1 }), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_31" /* ɵeld */](24, 0, null, null, 19, "core-navbar-buttons", [["end", ""]], null, null, null, navbar_buttons_ngfactory["b" /* View_CoreNavBarButtonsComponent_0 */], navbar_buttons_ngfactory["a" /* RenderType_CoreNavBarButtonsComponent */])), core["_30" /* ɵdid */](25, 245760, null, 1, navbar_buttons["a" /* CoreNavBarButtonsComponent */], [core["t" /* ElementRef */], providers_logger["a" /* CoreLoggerProvider */], dom["a" /* CoreDomUtilsProvider */]], null, null), core["_52" /* ɵqud */](603979776, 3, { buttons: 1 }), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_31" /* ɵeld */](28, 0, null, 0, 14, "core-context-menu", [], null, null, null, context_menu_ngfactory["b" /* View_CoreContextMenuComponent_0 */], context_menu_ngfactory["a" /* RenderType_CoreContextMenuComponent */])), core["_30" /* ɵdid */](29, 245760, null, 0, context_menu["a" /* CoreContextMenuComponent */], [translate_service["a" /* TranslateService */], popover_controller["a" /* PopoverController */], core["t" /* ElementRef */], dom["a" /* CoreDomUtilsProvider */], [2, tab["a" /* CoreTabComponent */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n            "])), (_l()(), core["_31" /* ɵeld */](31, 0, null, 0, 2, "core-context-menu-item", [], null, [[null, "action"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("action" === en)) {
        var pd_0 = (_co.viewInfo() !== false);
        ad = (pd_0 && ad);
    } return ad; }, context_menu_item_ngfactory["b" /* View_CoreContextMenuItemComponent_0 */], context_menu_item_ngfactory["a" /* RenderType_CoreContextMenuItemComponent */])), core["_30" /* ɵdid */](32, 770048, null, 0, context_menu_item["a" /* CoreContextMenuItemComponent */], [context_menu["a" /* CoreContextMenuComponent */]], { content: [0, "content"], iconAction: [1, "iconAction"], priority: [2, "priority"], hidden: [3, "hidden"] }, { action: "action" }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n            "])), (_l()(), core["_31" /* ɵeld */](35, 0, null, 0, 2, "core-context-menu-item", [], null, [[null, "action"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("action" === en)) {
        var pd_0 = (_co.viewInfo() !== false);
        ad = (pd_0 && ad);
    } return ad; }, context_menu_item_ngfactory["b" /* View_CoreContextMenuItemComponent_0 */], context_menu_item_ngfactory["a" /* RenderType_CoreContextMenuItemComponent */])), core["_30" /* ɵdid */](36, 770048, null, 0, context_menu_item["a" /* CoreContextMenuItemComponent */], [context_menu["a" /* CoreContextMenuComponent */]], { content: [0, "content"], iconAction: [1, "iconAction"], priority: [2, "priority"], hidden: [3, "hidden"] }, { action: "action" }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n            "])), (_l()(), core["_31" /* ɵeld */](39, 0, null, 0, 2, "core-context-menu-item", [], null, [[null, "action"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("action" === en)) {
        var pd_0 = (_co.toggleDelete() !== false);
        ad = (pd_0 && ad);
    } return ad; }, context_menu_item_ngfactory["b" /* View_CoreContextMenuItemComponent_0 */], context_menu_item_ngfactory["a" /* RenderType_CoreContextMenuItemComponent */])), core["_30" /* ɵdid */](40, 770048, null, 0, context_menu_item["a" /* CoreContextMenuItemComponent */], [context_menu["a" /* CoreContextMenuComponent */]], { content: [0, "content"], iconAction: [1, "iconAction"], priority: [2, "priority"], hidden: [3, "hidden"] }, { action: "action" }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_31" /* ɵeld */](46, 0, null, null, 20, "ion-content", [["class", "has-footer"]], [[2, "statusbar-padding", null], [2, "has-refresher", null]], null, null, content_ngfactory["b" /* View_Content_0 */], content_ngfactory["a" /* RenderType_Content */])), core["_30" /* ɵdid */](47, 4374528, [[1, 4]], 0, content["a" /* Content */], [config["a" /* Config */], platform["a" /* Platform */], dom_controller["a" /* DomController */], core["t" /* ElementRef */], core["V" /* Renderer */], app_app["a" /* App */], keyboard["a" /* Keyboard */], core["M" /* NgZone */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n    "])), (_l()(), core["_31" /* ɵeld */](49, 0, null, 1, 16, "core-loading", [], null, null, null, loading_ngfactory["b" /* View_CoreLoadingComponent_0 */], loading_ngfactory["a" /* RenderType_CoreLoadingComponent */])), core["_30" /* ɵdid */](50, 638976, null, 0, loading["a" /* CoreLoadingComponent */], [translate_service["a" /* TranslateService */], core["t" /* ElementRef */], events["a" /* CoreEventsProvider */], utils_utils["a" /* CoreUtilsProvider */]], { hideUntil: [0, "hideUntil"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_31" /* ɵeld */](53, 0, null, 0, 1, "core-infinite-loading", [["position", "top"]], null, [[null, "action"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("action" === en)) {
        var pd_0 = (_co.loadPrevious($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, infinite_loading_ngfactory["b" /* View_CoreInfiniteLoadingComponent_0 */], infinite_loading_ngfactory["a" /* RenderType_CoreInfiniteLoadingComponent */])), core["_30" /* ɵdid */](54, 49152, null, 0, infinite_loading["a" /* CoreInfiniteLoadingComponent */], [], { enabled: [0, "enabled"], error: [1, "error"], position: [2, "position"] }, { action: "action" }), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_31" /* ɵeld */](56, 0, null, 0, 5, "ion-list", [["class", "addon-messages-discussion-container safe-area-page"]], [[1, "aria-live", 0]], null, null, null, null)), core["_30" /* ɵdid */](57, 16384, null, 0, list["a" /* List */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], platform["a" /* Platform */], gesture_controller["l" /* GestureController */], dom_controller["a" /* DomController */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonMessagesDiscussionPage_2)), core["_30" /* ɵdid */](60, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonMessagesDiscussionPage_10)), core["_30" /* ɵdid */](64, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonMessagesDiscussionPage_11)), core["_30" /* ɵdid */](69, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; _ck(_v, 7, 0); var currVal_2 = _co.conversationImage; _ck(_v, 13, 0, currVal_2); var currVal_3 = _co.title; _ck(_v, 16, 0, currVal_3); _ck(_v, 25, 0); _ck(_v, 29, 0); var currVal_4 = core["_56" /* ɵunv */](_v, 32, 0, core["_44" /* ɵnov */](_v, 33).transform("addon.messages.info")); var currVal_5 = "information-circle"; var currVal_6 = 1000; var currVal_7 = (!_co.showInfo || _co.isGroup); _ck(_v, 32, 0, currVal_4, currVal_5, currVal_6, currVal_7); var currVal_8 = core["_56" /* ɵunv */](_v, 36, 0, core["_44" /* ɵnov */](_v, 37).transform("addon.messages.groupinfo")); var currVal_9 = "information-circle"; var currVal_10 = 999; var currVal_11 = (!_co.showInfo || !_co.isGroup); _ck(_v, 36, 0, currVal_8, currVal_9, currVal_10, currVal_11); var currVal_12 = core["_56" /* ɵunv */](_v, 40, 0, core["_44" /* ɵnov */](_v, 41).transform("addon.messages.showdeletemessages")); var currVal_13 = "trash"; var currVal_14 = 800; var currVal_15 = !_co.canDelete; _ck(_v, 40, 0, currVal_12, currVal_13, currVal_14, currVal_15); var currVal_18 = _co.loaded; _ck(_v, 50, 0, currVal_18); var currVal_19 = _co.canLoadMore; var currVal_20 = _co.loadMoreError; var currVal_21 = "top"; _ck(_v, 54, 0, currVal_19, currVal_20, currVal_21); var currVal_23 = _co.messages; _ck(_v, 60, 0, currVal_23); var currVal_24 = (!_co.messages || (_co.messages.length <= 0)); _ck(_v, 64, 0, currVal_24); var currVal_25 = (!_co.conversationId || _co.conversation); _ck(_v, 69, 0, currVal_25); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = core["_44" /* ɵnov */](_v, 6)._hidden; var currVal_1 = core["_44" /* ɵnov */](_v, 6)._sbPadding; _ck(_v, 5, 0, currVal_0, currVal_1); var currVal_16 = core["_44" /* ɵnov */](_v, 47).statusbarPadding; var currVal_17 = core["_44" /* ɵnov */](_v, 47)._hasRefresher; _ck(_v, 46, 0, currVal_16, currVal_17); var currVal_22 = _co.polite; _ck(_v, 56, 0, currVal_22); }); }
function View_AddonMessagesDiscussionPage_Host_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "page-addon-messages-discussion", [], null, null, null, View_AddonMessagesDiscussionPage_0, RenderType_AddonMessagesDiscussionPage)), core["_30" /* ɵdid */](1, 180224, null, 0, discussion_AddonMessagesDiscussionPage, [events["a" /* CoreEventsProvider */], sites["a" /* CoreSitesProvider */], nav_params["a" /* NavParams */], user["a" /* CoreUserProvider */], nav_controller["a" /* NavController */], sync["a" /* AddonMessagesSyncProvider */], dom["a" /* CoreDomUtilsProvider */], messages["a" /* AddonMessagesProvider */], providers_logger["a" /* CoreLoggerProvider */], utils_utils["a" /* CoreUtilsProvider */], app["a" /* CoreAppProvider */], translate_service["a" /* TranslateService */], [2, split_view["a" /* CoreSplitViewComponent */]], messages_offline["a" /* AddonMessagesOfflineProvider */], modal_controller["a" /* ModalController */]], null, null)], null, null); }
var AddonMessagesDiscussionPageNgFactory = core["_27" /* ɵccf */]("page-addon-messages-discussion", discussion_AddonMessagesDiscussionPage, View_AddonMessagesDiscussionPage_Host_0, {}, {}, []);

//# sourceMappingURL=discussion.ngfactory.js.map
// EXTERNAL MODULE: ./node_modules/@angular/forms/esm5/forms.js
var esm5_forms = __webpack_require__(22);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.loader.js
var translate_loader = __webpack_require__(331);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.compiler.js
var translate_compiler = __webpack_require__(332);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.parser.js
var translate_parser = __webpack_require__(334);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/missing-translation-handler.js
var missing_translation_handler = __webpack_require__(333);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.store.js
var translate_store = __webpack_require__(433);

// EXTERNAL MODULE: ./node_modules/ionic-angular/module.js
var ionic_angular_module = __webpack_require__(661);

// EXTERNAL MODULE: ./node_modules/ionic-angular/util/module-loader.js
var module_loader = __webpack_require__(248);

// CONCATENATED MODULE: ./src/addon/messages/pages/discussion/discussion.module.ngfactory.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddonMessagesDiscussionPageModuleNgFactory", function() { return AddonMessagesDiscussionPageModuleNgFactory; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 






























var AddonMessagesDiscussionPageModuleNgFactory = core["_28" /* ɵcmf */](discussion_module_AddonMessagesDiscussionPageModule, [], function (_l) { return core["_40" /* ɵmod */]([core["_41" /* ɵmpd */](512, core["o" /* ComponentFactoryResolver */], core["_21" /* ɵCodegenComponentFactoryResolver */], [[8, [action_sheet_component_ngfactory["a" /* ActionSheetCmpNgFactory */], alert_component_ngfactory["a" /* AlertCmpNgFactory */], app_root_ngfactory["a" /* IonicAppNgFactory */], loading_component_ngfactory["a" /* LoadingCmpNgFactory */], modal_component_ngfactory["a" /* ModalCmpNgFactory */], picker_component_ngfactory["a" /* PickerCmpNgFactory */], popover_component_ngfactory["a" /* PopoverCmpNgFactory */], select_popover_component_ngfactory["a" /* SelectPopoverNgFactory */], toast_component_ngfactory["a" /* ToastCmpNgFactory */], context_menu_popover_ngfactory["a" /* CoreContextMenuPopoverComponentNgFactory */], course_picker_menu_popover_ngfactory["a" /* CoreCoursePickerMenuPopoverComponentNgFactory */], recaptchamodal_ngfactory["a" /* CoreRecaptchaModalComponentNgFactory */], AddonMessagesDiscussionPageNgFactory]], [3, core["o" /* ComponentFactoryResolver */]], core["K" /* NgModuleRef */]]), core["_41" /* ɵmpd */](4608, common["m" /* NgLocalization */], common["l" /* NgLocaleLocalization */], [core["G" /* LOCALE_ID */], [2, common["v" /* ɵa */]]]), core["_41" /* ɵmpd */](4608, esm5_forms["x" /* ɵi */], esm5_forms["x" /* ɵi */], []), core["_41" /* ɵmpd */](4608, esm5_forms["d" /* FormBuilder */], esm5_forms["d" /* FormBuilder */], []), core["_41" /* ɵmpd */](4608, translate_loader["b" /* TranslateLoader */], translate_loader["a" /* TranslateFakeLoader */], []), core["_41" /* ɵmpd */](4608, translate_compiler["a" /* TranslateCompiler */], translate_compiler["b" /* TranslateFakeCompiler */], []), core["_41" /* ɵmpd */](4608, translate_parser["b" /* TranslateParser */], translate_parser["a" /* TranslateDefaultParser */], []), core["_41" /* ɵmpd */](4608, missing_translation_handler["b" /* MissingTranslationHandler */], missing_translation_handler["a" /* FakeMissingTranslationHandler */], []), core["_41" /* ɵmpd */](4608, translate_service["a" /* TranslateService */], translate_service["a" /* TranslateService */], [translate_store["a" /* TranslateStore */], translate_loader["b" /* TranslateLoader */], translate_compiler["a" /* TranslateCompiler */], translate_parser["b" /* TranslateParser */], missing_translation_handler["b" /* MissingTranslationHandler */], translate_service["b" /* USE_DEFAULT_LANG */], translate_service["c" /* USE_STORE */]]), core["_41" /* ɵmpd */](512, common["b" /* CommonModule */], common["b" /* CommonModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["v" /* ɵba */], esm5_forms["v" /* ɵba */], []), core["_41" /* ɵmpd */](512, esm5_forms["i" /* FormsModule */], esm5_forms["i" /* FormsModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["s" /* ReactiveFormsModule */], esm5_forms["s" /* ReactiveFormsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["a" /* IonicModule */], ionic_angular_module["a" /* IonicModule */], []), core["_41" /* ɵmpd */](512, _ngx_translate_core["b" /* TranslateModule */], _ngx_translate_core["b" /* TranslateModule */], []), core["_41" /* ɵmpd */](512, directives_module["a" /* CoreDirectivesModule */], directives_module["a" /* CoreDirectivesModule */], []), core["_41" /* ɵmpd */](512, pipes_module["a" /* CorePipesModule */], pipes_module["a" /* CorePipesModule */], []), core["_41" /* ɵmpd */](512, components_module["a" /* CoreComponentsModule */], components_module["a" /* CoreComponentsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["b" /* IonicPageModule */], ionic_angular_module["b" /* IonicPageModule */], []), core["_41" /* ɵmpd */](512, discussion_module_AddonMessagesDiscussionPageModule, discussion_module_AddonMessagesDiscussionPageModule, []), core["_41" /* ɵmpd */](256, translate_service["c" /* USE_STORE */], undefined, []), core["_41" /* ɵmpd */](256, translate_service["b" /* USE_DEFAULT_LANG */], undefined, []), core["_41" /* ɵmpd */](256, module_loader["a" /* LAZY_LOADED_TOKEN */], discussion_AddonMessagesDiscussionPage, [])]); });

//# sourceMappingURL=discussion.module.ngfactory.js.map

/***/ }),

/***/ 1957:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RenderType_Toolbar; });
/* harmony export (immutable) */ __webpack_exports__["b"] = View_Toolbar_0;
/* unused harmony export View_Toolbar_Host_0 */
/* unused harmony export ToolbarNgFactory */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__toolbar__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_config__ = __webpack_require__(6);
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 




var styles_Toolbar = [];
var RenderType_Toolbar = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_Toolbar, data: {} });

function View_Toolbar_0(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](2, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 1, "div", [["class", "toolbar-background"]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](1, 278528, null, 0, __WEBPACK_IMPORTED_MODULE_1__angular_common__["i" /* NgClass */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* IterableDiffers */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* KeyValueDiffers */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Renderer2 */]], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_43" /* ɵncd */](null, 0), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_43" /* ɵncd */](null, 1), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_43" /* ɵncd */](null, 2), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](5, 0, null, null, 2, "div", [["class", "toolbar-content"]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](6, 278528, null, 0, __WEBPACK_IMPORTED_MODULE_1__angular_common__["i" /* NgClass */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* IterableDiffers */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* KeyValueDiffers */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Renderer2 */]], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_43" /* ɵncd */](null, 3)], function (_ck, _v) { var _co = _v.component; var currVal_0 = "toolbar-background"; var currVal_1 = ("toolbar-background-" + _co._mode); _ck(_v, 1, 0, currVal_0, currVal_1); var currVal_2 = "toolbar-content"; var currVal_3 = ("toolbar-content-" + _co._mode); _ck(_v, 6, 0, currVal_2, currVal_3); }, null); }
function View_Toolbar_Host_0(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 1, "ion-toolbar", [["class", "toolbar"]], [[2, "statusbar-padding", null]], null, null, View_Toolbar_0, RenderType_Toolbar)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](1, 49152, null, 0, __WEBPACK_IMPORTED_MODULE_2__toolbar__["a" /* Toolbar */], [__WEBPACK_IMPORTED_MODULE_3__config_config__["a" /* Config */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */]], null, null)], null, function (_ck, _v) { var currVal_0 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 1)._sbPadding; _ck(_v, 0, 0, currVal_0); }); }
var ToolbarNgFactory = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_27" /* ɵccf */]("ion-toolbar", __WEBPACK_IMPORTED_MODULE_2__toolbar__["a" /* Toolbar */], View_Toolbar_Host_0, { color: "color", mode: "mode" }, {}, ["[menuToggle],ion-buttons[left]", "ion-buttons[start]", "ion-buttons[end],ion-buttons[right]", "*"]);

//# sourceMappingURL=toolbar.ngfactory.js.map

/***/ }),

/***/ 1960:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RenderType_CoreSendMessageFormComponent; });
/* harmony export (immutable) */ __webpack_exports__["b"] = View_CoreSendMessageFormComponent_0;
/* unused harmony export View_CoreSendMessageFormComponent_Host_0 */
/* unused harmony export CoreSendMessageFormComponentNgFactory */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__directives_auto_focus__ = __webpack_require__(337);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_utils_dom__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_utils_utils__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular_navigation_nav_controller__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__directives_auto_rows__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ionic_angular_components_toolbar_toolbar_item__ = __webpack_require__(435);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ionic_angular_config_config__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ionic_angular_components_toolbar_toolbar__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ionic_angular_components_toolbar_navbar__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__node_modules_ionic_angular_components_button_button_ngfactory__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ionic_angular_components_button_button__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__directives_supress_events__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ngx_translate_core_src_translate_pipe__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ngx_translate_core_src_translate_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_ionic_angular_components_icon_icon__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__send_message_form__ = __webpack_require__(1369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__providers_utils_text__ = __webpack_require__(9);
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 



















var styles_CoreSendMessageFormComponent = [];
var RenderType_CoreSendMessageFormComponent = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_CoreSendMessageFormComponent, data: {} });

function View_CoreSendMessageFormComponent_0(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 28, "form", [["novalidate", ""]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "submit"], [null, "reset"]], function (_v, en, $event) { var ad = true; if (("submit" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 2).onSubmit($event) !== false);
        ad = (pd_0 && ad);
    } if (("reset" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 2).onReset() !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](1, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["w" /* ɵbf */], [], null, null), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](2, 4210688, null, 0, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["p" /* NgForm */], [[8, null], [8, null]], null, null), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_50" /* ɵprd */](2048, null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* ControlContainer */], null, [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["p" /* NgForm */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](4, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["o" /* NgControlStatusGroup */], [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* ControlContainer */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](6, 0, null, null, 7, "textarea", [["class", "core-send-message-input"], ["core-auto-rows", ""], ["name", "message"], ["rows", "1"]], [[8, "placeholder", 0], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "onResize"], [null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"], [null, "change"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("input" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 7)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 7).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (__WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 7)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (__WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 7)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("input" === en)) {
        var pd_4 = (__WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 13).onInput() !== false);
        ad = (pd_4 && ad);
    } if (("change" === en)) {
        var pd_5 = (__WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 13).onChange() !== false);
        ad = (pd_5 && ad);
    } if (("ngModelChange" === en)) {
        var pd_6 = ((_co.message = $event) !== false);
        ad = (pd_6 && ad);
    } if (("onResize" === en)) {
        var pd_7 = (_co.textareaResized() !== false);
        ad = (pd_7 && ad);
    } return ad; }, null, null)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](7, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* DefaultValueAccessor */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Renderer2 */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], [2, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* COMPOSITION_BUFFER_MODE */]]], null, null), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_50" /* ɵprd */](1024, null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["l" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* DefaultValueAccessor */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](9, 671744, null, 0, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["q" /* NgModel */], [[2, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* ControlContainer */]], [8, null], [8, null], [2, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["l" /* NG_VALUE_ACCESSOR */]]], { name: [0, "name"], model: [1, "model"] }, { update: "ngModelChange" }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_50" /* ɵprd */](2048, null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["m" /* NgControl */], null, [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["q" /* NgModel */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](11, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["n" /* NgControlStatus */], [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["m" /* NgControl */]], null, null), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](12, 81920, null, 0, __WEBPACK_IMPORTED_MODULE_2__directives_auto_focus__["a" /* CoreAutoFocusDirective */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_3__providers_utils_dom__["a" /* CoreDomUtilsProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_utils_utils__["a" /* CoreUtilsProvider */], [2, __WEBPACK_IMPORTED_MODULE_5_ionic_angular_navigation_nav_controller__["a" /* NavController */]]], { coreAutoFocus: [0, "coreAutoFocus"] }, null), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](13, 4210688, null, 0, __WEBPACK_IMPORTED_MODULE_6__directives_auto_rows__["a" /* CoreAutoRowsDirective */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */]], null, { onResize: "onResize" }), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](15, 0, null, null, 12, "ion-buttons", [["end", ""]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](16, 16384, null, 1, __WEBPACK_IMPORTED_MODULE_7_ionic_angular_components_toolbar_toolbar_item__["a" /* ToolbarItem */], [__WEBPACK_IMPORTED_MODULE_8_ionic_angular_config_config__["a" /* Config */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */], [2, __WEBPACK_IMPORTED_MODULE_9_ionic_angular_components_toolbar_toolbar__["a" /* Toolbar */]], [2, __WEBPACK_IMPORTED_MODULE_10_ionic_angular_components_toolbar_navbar__["a" /* Navbar */]]], null, null), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_52" /* ɵqud */](603979776, 1, { _buttons: 1 }), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](19, 0, null, null, 7, "button", [["clear", "true"], ["icon-only", ""], ["ion-button", ""], ["type", "submit"]], [[8, "disabled", 0], [1, "aria-label", 0]], [[null, "onClick"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("onClick" === en)) {
        var pd_0 = (_co.submitForm($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_11__node_modules_ionic_angular_components_button_button_ngfactory__["b" /* View_Button_0 */], __WEBPACK_IMPORTED_MODULE_11__node_modules_ionic_angular_components_button_button_ngfactory__["a" /* RenderType_Button */])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](20, 1097728, [[1, 4]], 0, __WEBPACK_IMPORTED_MODULE_12_ionic_angular_components_button_button__["a" /* Button */], [[8, ""], __WEBPACK_IMPORTED_MODULE_8_ionic_angular_config_config__["a" /* Config */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */]], { clear: [0, "clear"] }, null), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](21, 81920, null, 0, __WEBPACK_IMPORTED_MODULE_13__directives_supress_events__["a" /* CoreSupressEventsDirective */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */]], null, { onClick: "onClick" }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_47" /* ɵpid */](131072, __WEBPACK_IMPORTED_MODULE_14__ngx_translate_core_src_translate_pipe__["a" /* TranslatePipe */], [__WEBPACK_IMPORTED_MODULE_15__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */]]), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, 0, ["\n            "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](24, 0, null, 0, 1, "ion-icon", [["color", "dark"], ["name", "send"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](25, 147456, null, 0, __WEBPACK_IMPORTED_MODULE_16_ionic_angular_components_icon_icon__["a" /* Icon */], [__WEBPACK_IMPORTED_MODULE_8_ionic_angular_config_config__["a" /* Config */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */]], { color: [0, "color"], name: [1, "name"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_15 = "message"; var currVal_16 = _co.message; _ck(_v, 9, 0, currVal_15, currVal_16); var currVal_17 = _co.showKeyboard; _ck(_v, 12, 0, currVal_17); var currVal_20 = "true"; _ck(_v, 20, 0, currVal_20); _ck(_v, 21, 0); var currVal_22 = "dark"; var currVal_23 = "send"; _ck(_v, 25, 0, currVal_22, currVal_23); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 4).ngClassUntouched; var currVal_1 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 4).ngClassTouched; var currVal_2 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 4).ngClassPristine; var currVal_3 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 4).ngClassDirty; var currVal_4 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 4).ngClassValid; var currVal_5 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 4).ngClassInvalid; var currVal_6 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 4).ngClassPending; _ck(_v, 0, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6); var currVal_7 = _co.placeholder; var currVal_8 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 11).ngClassUntouched; var currVal_9 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 11).ngClassTouched; var currVal_10 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 11).ngClassPristine; var currVal_11 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 11).ngClassDirty; var currVal_12 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 11).ngClassValid; var currVal_13 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 11).ngClassInvalid; var currVal_14 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 11).ngClassPending; _ck(_v, 6, 0, currVal_7, currVal_8, currVal_9, currVal_10, currVal_11, currVal_12, currVal_13, currVal_14); var currVal_18 = !_co.message; var currVal_19 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_56" /* ɵunv */](_v, 19, 1, __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 22).transform("core.send")); _ck(_v, 19, 0, currVal_18, currVal_19); var currVal_21 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 25)._hidden; _ck(_v, 24, 0, currVal_21); }); }
function View_CoreSendMessageFormComponent_Host_0(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 1, "core-send-message-form", [], null, null, null, View_CoreSendMessageFormComponent_0, RenderType_CoreSendMessageFormComponent)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](1, 114688, null, 0, __WEBPACK_IMPORTED_MODULE_17__send_message_form__["a" /* CoreSendMessageFormComponent */], [__WEBPACK_IMPORTED_MODULE_4__providers_utils_utils__["a" /* CoreUtilsProvider */], __WEBPACK_IMPORTED_MODULE_18__providers_utils_text__["a" /* CoreTextUtilsProvider */]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var CoreSendMessageFormComponentNgFactory = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_27" /* ɵccf */]("core-send-message-form", __WEBPACK_IMPORTED_MODULE_17__send_message_form__["a" /* CoreSendMessageFormComponent */], View_CoreSendMessageFormComponent_Host_0, { message: "message", placeholder: "placeholder", showKeyboard: "showKeyboard" }, { onSubmit: "onSubmit", onResize: "onResize" }, []);

//# sourceMappingURL=send-message-form.ngfactory.js.map

/***/ })

});
//# sourceMappingURL=12.js.map