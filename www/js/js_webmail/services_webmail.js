angular.module('starter.webmailservices', [])

.factory("$fileFactory", function($q) {

    var File = function() { };

    File.prototype = {

        getParentDirectory: function(path) {
            var deferred = $q.defer();
            window.resolveLocalFileSystemURI(path, function(fileSystem) {
                fileSystem.getParent(function(result) {
                    deferred.resolve(result);
                }, function(error) {
                    deferred.reject(error);
                });
            }, function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        },

        getEntriesAtRoot: function() {
            var deferred = $q.defer();
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
                var directoryReader = fileSystem.root.createReader();
                directoryReader.readEntries(function(entries) {
                    deferred.resolve(entries);
                }, function(error) {
                    deferred.reject(error);
                });
            }, function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        },

        getEntries: function(path) {
            var deferred = $q.defer();
            window.resolveLocalFileSystemURI(path, function(fileSystem) {
                var directoryReader = fileSystem.createReader();
                directoryReader.readEntries(function(entries) {
                    deferred.resolve(entries);
                }, function(error) {
                    deferred.reject(error);
                });
            }, function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }

    };

    return File;

})


/**
 * SERVICES LIST MAILS IN WEBMAIL
 */
 .factory('Mail', function ($resource,apiUrlLocal,PATH_WEBMAIL) {
  
  var url = apiUrlLocal+PATH_WEBMAIL;
  console.log('==SERVICE WEBMAIL== URL',url);
  return $resource(url,{},{'query':{method:'GET', isArray:false}});
})


/**
 * SERVICES READ FORLDERS
 */
 .factory('Webmal_read_forlders', function ($resource,apiUrlLocal,PATH_WEBMAIL_READ_FOLDERS) {
  
  var url = apiUrlLocal+PATH_WEBMAIL_READ_FOLDERS;
  console.log('==SERVICE WEBMAIL== read forlders',url);
  return $resource(url,{},{'query':{method:'GET', isArray:false}});
});