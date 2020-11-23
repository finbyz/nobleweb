# -*- coding: utf-8 -*-
from setuptools import setup, find_packages

with open('requirements.txt') as f:
	install_requires = f.read().strip().split('\n')

# get version from __version__ variable in nobleweb/__init__.py
from nobleweb import __version__ as version

setup(
	name='nobleweb',
	version=version,
	description='website',
	author='"nirav"',
	author_email='varaiyaniravn@gmail.com',
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
