// Copyright 2015-2016, EMC, Inc.

'use strict';

module.exports = {
    friendlyName: 'Install Photon OS',
    injectableName: 'Graph.InstallPhotonOS',
    options: {
        defaults: {},
        'install-os': {
            version: null,
            schedulerOverrides: {
                timeout: 3600000 // 1 hour
            }
        },
        'validate-ssh': {
            retries: 10
        }
    },
    tasks: [
        {
            label: 'set-boot-pxe',
            taskName: 'Task.Obm.Node.PxeBoot',
            ignoreFailure: true
        },
        {
            label: 'reboot',
            taskName: 'Task.Obm.Node.Reboot',
            waitOn: {
                'set-boot-pxe': 'finished'
            }
        },
        {
            label: 'install-os',
            taskName: 'Task.Os.Install.PhotonOS',
            waitOn: {
                'reboot': 'succeeded'
            }
        },
        {
            label: 'validate-ssh',
            taskName: 'Task.Ssh.Validation',
            waitOn: {
                'install-os': 'succeeded'
            }
        }
    ]
};
