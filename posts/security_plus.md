---
title: 'Security+ notes'
date: '2024-01-05'
---

# Security+ Notes

1. **Mastering Security Basics**
    1. Ensure Confidentialilty
        - **Confidentiality** prevents the unauthorized disclosure of data. In other words, authorized perssonall can access the data but unauthroized people cannot.
    2. Encryption
        - **Access Controls**
        - **Identification**
        - **Authentication**
        - **Authroization**
    3. Remember this
        - Confidentiality ensures that data is only viewable by authroized users. The best way to protect confidentiality of data is by encrypting it. This is includes data such as PII (personally identifiable information), and any other data. ACcess controls help protect confidentiality by restructing Accesss.
    4. Provide Integrity
        - Integrity provides assurances that data has not changed.
        - You can use hashsing with sha algorithm to ensure integrity
        - **Recap:** integrity verifies that data has not been modified. Loss of integrity can occur through unauthorized or uninteded changes.
    5. Basic Risk Concepts
        - Risk: tje possibility or likelihood of a threat exploiting a vulnerability resulting in a loss
        - Threat: any circumstance or event that has the potential to compromise confidentiality, integrity, or availability.
        - Vulnerability: Weakeness

    6. Understanding Security Controls
        - Security controls are categorized as managerial (documented in written policies), operational (performed in day to day operations), or technical (implemented in tech).
        - preventative controls attempt to prevent an incident from occurring
        - detective controls attemp to detect incidents after they have occurred.
        - corrective controls attemt to reverse the impact of an incident
        - deterrent controls attempt to discourage individuals from causing an incident.
        compensating controls are alternative corols used when a rpimary control is not feasable
        - physical controls refer to controls you can physically touch
        - Managerial Controls
            - risk assessment
            - vulnerability assesment
        - Operational Controls
            - Awareness and training
            - Configuration Management
            - media protection
            - Physical and environmental protection
        - Tech controls
            - Encryption
            - Antivirus Software
            - ISD and ISPS can monitor a network or host for intrusions and provide ongoing protection against various threats.
            - Firewalls
            - Least Privelege
        - Control Types


a firewall might be configured to protect against pings which uses icmp but is reachable through https

hping command is similair to ping but ican send the pings using TCP/UDP, and ICMP. Can also scan for open ports.
IPconfig shows tcp/ip. This includes the ip address subnet mask, default gateway, mac address, and teh address of a DNS. Sgis tge config info of all network interface cards on a system including wired and wireless nics.
