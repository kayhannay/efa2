#efa 2 project
This project is just a wrapper for the rowing and canoeing log book software [efa](http://efa.nmichael.de/) to form a Debian GNU/Linux software package. It is used by efaLive.

Please note that this is a very simple Debian package only. It is not compliant with the Debian rules for packages!

##Binaries and documentation
For more information about efaLive, have a look to the efaLive documentation on [my homepage](http://www.hannay.de/index.php?option=com_content&view=article&id=46&Itemid=46). There you can also find efaLive CD images for download.

##Related projects
* [Debian GNU/Linux project](http://www.debian.-org/)
* [efaLive CD](https://github.com/efalive/efalive_cd) - the live CD build configuration
* [efaLive](https://github.com/efalive/efalive) - the glue code between Debian and the efa software
* [efa 2](https://github.com/efalive/efa2) - the Debian package configuration of the efa software (this project)
* [efa](http://efa.nmichael.de/) - the rowing and canoeing log book software

##Requirements
To build the Debian package, you need to have [dpkg-dev](http://packages.debian.org/wheezy/dpkg-dev) installed.

##How to build
To build the debian package, there is a script for convenience:

```shell
build_deb.sh
```

